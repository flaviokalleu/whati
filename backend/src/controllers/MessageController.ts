import { Request, Response } from "express";
import AppError from "../errors/AppError";

import SetTicketMessagesAsRead from "../helpers/SetTicketMessagesAsRead";
import { getIO } from "../libs/socket";
import Message from "../models/Message";
import Queue from "../models/Queue";
import User from "../models/User";
import Whatsapp from "../models/Whatsapp";
import ListMessagesServiceAll from "../services/MessageServices/ListMessagesServiceAll";
import formatBody from "../helpers/Mustache";

import ListMessagesService from "../services/MessageServices/ListMessagesService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import FindOrCreateTicketService from "../services/TicketServices/FindOrCreateTicketService";
import UpdateTicketService from "../services/TicketServices/UpdateTicketService";
import DeleteWhatsAppMessage from "../services/WbotServices/DeleteWhatsAppMessage";
import SendWhatsAppMedia, { SendWhatsAppMediaFileAddress } from "../services/WbotServices/SendWhatsAppMedia";
import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";
import CheckContactNumber from "../services/WbotServices/CheckNumber";
import CheckIsValidContact from "../services/WbotServices/CheckIsValidContact";
import GetProfilePicUrl from "../services/WbotServices/GetProfilePicUrl";

import TranscreveAudioService from "../services/MessageServices/TranslateAudioService";
import TranslateAudioService from "../services/MessageServices/TranslateAudioService";

import CreateOrUpdateContactService from "../services/ContactServices/CreateOrUpdateContactService";
import ShowMessageService, { GetWhatsAppFromMessage } from "../services/MessageServices/ShowMessageService";
import { ShowContactService1 } from "../services/ContactServices/ShowContactService";
import ShowUserService from "../services/UserServices/ShowUserService";
import { firstQueueThisUser } from "../utils/user";
import { notifyUpdate } from "../services/TicketServices/UpdateTicketService";

const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath("C:\\FFmpeg\\ffmpeg-2024-01-20-git-6c4388b468-essentials_build\\bin\\ffmpeg.exe");
const path = require('path');
const crypto = require('crypto');

type IndexQuery = {
  pageNumber: string;
};

type MessageData = {
  body: string;
  fromMe: boolean;
  read: boolean;
  quotedMsg?: Message;
  number?: string;
  closeTicket?: true;
};

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { pageNumber } = req.query as IndexQuery;
  const { companyId, profile } = req.user;
  const queues: number[] = [];

  if (profile !== "admin") {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Queue, as: "queues" }]
    });
    user.queues.forEach(queue => {
      queues.push(queue.id);
    });
  }

  const { count, messages, ticket, hasMore } = await ListMessagesService({
    pageNumber,
    ticketId,
    companyId,
    queues
  });

  SetTicketMessagesAsRead(ticket);

  return res.json({ count, messages, ticket, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { body, quotedMsg }: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];
  const { companyId } = req.user;

  const ticket = await ShowTicketService(ticketId, companyId);

  SetTicketMessagesAsRead(ticket);

  if (medias) {
    await Promise.all(
      medias.map(async (media: Express.Multer.File, index) => {
        await SendWhatsAppMedia({ media, ticket, body: Array.isArray(body) ? body[index] : body });
      })
    );
  } else {
    const send = await SendWhatsAppMessage({ body, ticket, quotedMsg });
  }

  return res.send();
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { messageId } = req.params;
  const { companyId } = req.user;

  const message = await DeleteWhatsAppMessage(messageId);

  const io = getIO();
  io.to(message.ticketId.toString()).emit(`company-${companyId}-appMessage`, {
    action: "update",
    message
  });

  return res.send();
};

export const allMe = async (req: Request, res: Response): Promise<Response> => {

  const dateStart: any = req.query.dateStart;
  const dateEnd: any = req.query.dateEnd;
  const fromMe: any = req.query.fromMe;

  const { companyId } = req.user;

  const { count } = await ListMessagesServiceAll({
    companyId,
    fromMe,
    dateStart,
    dateEnd
  });

  return res.json({ count });
};

export const send = async (req: Request, res: Response): Promise<Response> => {
  const { whatsappId } = req.params as unknown as { whatsappId: number };
  const messageData: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];

  try {
    const whatsapp = await Whatsapp.findByPk(whatsappId);

    if (!whatsapp) {
      throw new Error("Não foi possível realizar a operação");
    }

    if (messageData.number === undefined) {
      throw new Error("O número é obrigatório");
    }

    const numberToTest = messageData.number;
    const body = messageData.body;

    const companyId = whatsapp.companyId;

    const CheckValidNumber = await CheckContactNumber(numberToTest, companyId);
    const number = CheckValidNumber.jid.replace(/\D/g, "");
    const profilePicUrl = await GetProfilePicUrl(
      number,
      companyId
    );
    const contactData = {
      name: `${number}`,
      number,
      profilePicUrl,
      isGroup: false,
      companyId
    };

    const contact = await CreateOrUpdateContactService(contactData);

    const ticket = await FindOrCreateTicketService(contact, whatsapp.id!, 0, companyId);

    if (medias) {
      await Promise.all(
        medias.map(async (media: Express.Multer.File) => {
          await req.app.get("queues").messageQueue.add(
            "SendMessage",
            {
              whatsappId,
              data: {
                number,
                body: body ? formatBody(body, contact) : media.originalname,
                mediaPath: media.path,
                fileName: media.originalname
              }
            },
            { removeOnComplete: true, attempts: 3 }
          );
        })
      );
    } else {
      await SendWhatsAppMessage({ body: formatBody(body, contact), ticket });

      await ticket.update({
        lastMessage: body,
      });

    }

    if (messageData.closeTicket) {
      setTimeout(async () => {
        await UpdateTicketService({
          ticketId: ticket.id,
          ticketData: { status: "closed" },
          companyId
        });
      }, 1000);
    }

    SetTicketMessagesAsRead(ticket);

    return res.send({ mensagem: "Mensagem enviada" });
  } catch (err: any) {
    if (Object.keys(err).length === 0) {
      throw new AppError(
        "Não foi possível enviar a mensagem, tente novamente em alguns instantes"
      );
    } else {
      throw new AppError(err.message);
    }
  }
};

export const storeAudio = async (req: Request, res: Response): Promise<Response> => {
  const audio = req.file as Express.Multer.File;
  let textTranslate = '';
  const outputFilename = generateRandomFilename();
  const outputPath = `./public/${outputFilename}`;
  await convertToMp3(audio.path, outputPath);
  if (audio) {
    textTranslate = await TranslateAudioService(outputPath);
  }
  return res.send(textTranslate || 'Transcrição não disponível');
};

function convertToMp3(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
          .toFormat('mp3')
          .on('end', () => {
              resolve(outputPath);
          })
          .on('error', (err) => {
              console.error('Erro na conversão do áudio:', err);
              reject(err);
          })
          .saveToFile(outputPath);
  });
}

function generateRandomFilename() {
  const randomId = crypto.randomBytes(16).toString('hex');
  return randomId + '.mp3';
}

export const forwardMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log('>>>>>>>>>>>>>>>>>forwardMessage X<<<<<<<<<<<<<<<<<<<');
  const { body, quotedMsg }: MessageData = req.body;
  const messageId = req.body.messageId;
  const contactId = req.body.contactId;

  if (!messageId || !contactId) {
    return res.status(200).send("MessageId or ContactId not found");
  }
  const message = await ShowMessageService(messageId);
  const contact = await ShowContactService1(contactId);

  if (!message) {
    return res.status(404).send("Message not found");
  }
  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  const whatsAppConnectionId = await GetWhatsAppFromMessage(message);
  if (!whatsAppConnectionId) {
    return res.status(404).send('Whatsapp from message not found');
  }

  const companyId = req.user.companyId; // verificar
  const ticket = await FindOrCreateTicketService(contact, whatsAppConnectionId, 0, companyId);

  SetTicketMessagesAsRead(ticket);

  if (message.mediaType === 'conversation' || message.mediaType === 'extendedTextMessage') {
    await SendWhatsAppMessage({ body: message.body, ticket, quotedMsg });
  } else {
    await SendWhatsAppMediaFileAddress(message.mediaUrl || '', ticket, message.body); // função com erro
  }
  const user = await ShowUserService(req.user.id);
  const queueId = await firstQueueThisUser(user);
  ticket.status = 'open';
  ticket.queueId = queueId?.id || null;
  ticket.userId = user.id;
  ticket.save();
  const io = getIO();
  notifyUpdate(io, ticket, ticket.id, companyId);

  return res.send();
}
