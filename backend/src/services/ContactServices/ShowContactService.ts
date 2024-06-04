import Contact from "../../models/Contact";
import AppError from "../../errors/AppError";
import sequelize from "../../database";

const ShowContactService = async (
  id: string | number,
  companyId: number
): Promise<Contact> => {
  const contact = await Contact.findByPk(id, { include: ["extraInfo", "whatsapp"] });

  if (contact?.companyId !== companyId) {
    throw new AppError("Não é possível excluir registro de outra empresa");
  }

  if (!contact) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }

  return contact;
};

export const ShowContactService1 = async (id: string | number): Promise<Contact | undefined> => {
  const contact = await sequelize.query(`select * from "Contacts" where id = '${id}' limit 1`, {
    model: Contact,
    mapToModel: true
  });
  if (contact.length > 0) {
    return contact[0] as unknown as Contact;
  }
  return undefined;
};

export default ShowContactService;
