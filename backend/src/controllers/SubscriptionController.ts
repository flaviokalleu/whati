import { Request, Response } from "express";
import express from "express";
import * as Yup from "yup";
import * as dotenv from 'dotenv';
import Gerencianet from "gn-api-sdk-typescript";
import AppError from "../errors/AppError";
import options from "../config/Gn";
import Company from "../models/Company";
import Invoices from "../models/Invoices";
import { getIO } from "../libs/socket";
import axios from 'axios';

dotenv.config();

const app = express();

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const keyMp = process.env.MERCADO_PAGO_KEYMP;

export const index = async (req: Request, res: Response): Promise<Response> => {
  const gerencianet = Gerencianet(options);
  return res.json(gerencianet.getSubscriptions());
};

export const createSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const gerencianet = Gerencianet(options);
  const { companyId } = req.user;
  const companySuper = 1;
  const schema = Yup.object().shape({
    price: Yup.string().required(),
    users: Yup.string().required(),
    connections: Yup.string().required()
  });
  if (!(await schema.isValid(req.body))) {
    console.log("Erro linha 32");
    throw new AppError("Validation fails", 400);
  }
  
  const {
    firstName,
    price,
    users,
    connections,
    address2,
    city,
    state,
    zipcode,
    country,
    plan,
    invoiceId
  } = req.body;

  const body = {
    calendario: { expiracao: 3600 },
    valor: {
      original: price
        .toLocaleString("pt-br", { minimumFractionDigits: 2 })
        .replace(",", ".")
    },
    chave: process.env.GERENCIANET_PIX_KEY,
    solicitacaoPagador: `#Fatura:${invoiceId}`
  };
  
  const unitPrice = parseFloat(price);
  const data = {
    back_urls: {
      success: `${process.env.FRONTEND_URL}/financeiro`,
      failure: `${process.env.FRONTEND_URL}/financeiro`
    },
    auto_return: "approved",
    expires: false,
    items: [
      {
        title: `#Fatura:${invoiceId}`,
        description: '',
        picture_url: '',
        category_id: '',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: unitPrice
      }
    ]
  };
  
  try {
    const response = await axios.post('https://api.mercadopago.com/checkout/preferences', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const urlMcPg = response.data.init_point;

    const updateCompany = await Company.findOne();
    if (!updateCompany) {
      throw new AppError("Company not found", 404);
    }
    return res.json({ urlMcPg });
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Problema encontrado, entre em contato com o suporte!",
      400
    );
  }
};

export const createWebhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schema = Yup.object().shape({
    chave: Yup.string().required(),
    url: Yup.string().required()
  });
  if (!(await schema.isValid(req.body))) {
    throw new AppError("Validation fails", 400);
  }
  const { chave, url } = req.body;
  const body = { webhookUrl: url };
  const params = { chave };
  try {
    const gerencianet = Gerencianet(options);
    const create = await gerencianet.pixConfigWebhook(params, body);
    return res.json(create);
  } catch (error) {
    console.log(error);
  }
};

export const webhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const keyMp = process.env.MERCADO_PAGO_KEYMP;

  if (!keyMp) {
    throw new AppError("Mercado Pago key not found", 400);
  }

  const { type } = req.params;
  const { evento, data } = req.body; 

  if (evento === "teste_webhook") {
    return res.json({ ok: true });
  }

  if (data && data.id) { 
    const response = await axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`,  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const detalhe = response.data;

    if (detalhe.status === "approved") {
      const { additional_info } = detalhe;

      if (additional_info && additional_info.items && additional_info.items.length > 0) {
        const solicitacaoPagador = additional_info.items[0].title;
        const invoiceID = solicitacaoPagador.replace("#Fatura:", "");

        const invoices = await Invoices.findByPk(invoiceID);

        if (invoices) { 
          const companyId = invoices.companyId;
          const company = await Company.findByPk(companyId);

          if (company && company.dueDate) { 
            const expiresAt = new Date(company.dueDate);
            expiresAt.setDate(expiresAt.getDate() + 30);
            const date = expiresAt.toISOString().split("T")[0];

            await company.update({ dueDate: date });

            await invoices.update({
              status: "paid"
            }, {
              where: { id: invoiceID }
            });

            const io = getIO();
            if (io) { 
              const companyUpdate = await Company.findOne({
                where: { id: companyId }
              });

              io.emit(`company-${companyId}-payment`, {
                action: detalhe.status,
                company: companyUpdate
              });
            }
          }
        }
      }
    }
  }

  return res.json({ ok: true });
};
