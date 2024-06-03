import { Op, fn, where, col, Filterable, Includeable } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";
import Ticket from "../../models/Ticket";
import Contact from "../../models/Contact";
import Message from "../../models/Message";
import Queue from "../../models/Queue";
import User from "../../models/User";
import ShowUserService from "../UserServices/ShowUserService";
import Tag from "../../models/Tag";
import TicketTag from "../../models/TicketTag";
import { intersection } from "lodash";
import Whatsapp from "../../models/Whatsapp";

interface Request {
  searchParam?: string;
  pageNumber?: string;
  status?: string;
  date?: string;
  dateStart?: string;
  dateEnd?: string;
  updatedAt?: string;
  showAll?: string;
  userId: string;
  withUnreadMessages?: string;
  queueIds: number[];
  tags: number[];
  users: number[];
  contacts?: string[];
  updatedStart?: string;
  updatedEnd?: string;
  connections?: string[];
  statusFilter?: string;
  queuesFilter?: string[];
  isGroup?: string;
  companyId: number;
}

interface Response {
  tickets: Ticket[];
  count: number;
  hasMore: boolean;
}

const ListTicketsService = async ({
  searchParam = "",
  pageNumber = "1",
  queueIds,
  tags,
  users,
  status,
  date,
  dateStart,
  dateEnd,
  updatedAt,
  showAll,
  userId,
  withUnreadMessages,
  contacts,
  updatedStart,
  updatedEnd,
  connections,
  statusFilter,
  queuesFilter,
  isGroup,
  companyId
}: Request): Promise<Response> => {
  // Verifica se o usuário é administrador
  const user = await ShowUserService(userId);
  const isAdmin = user && user.profile === "admin";

  // Condição inicial para onde (where)
  let whereCondition: Filterable["where"] = {
    companyId
  };

  // Ajusta a condição onde (where) com base no status do usuário
  if (isAdmin) {
    whereCondition = {
      ...whereCondition,
      queueId: { [Op.or]: [queueIds, null] },
      status: "pending"
    };
  } else {
    whereCondition = {
      ...whereCondition,
      userId
    };
  }

  // Inclui as condições de associação (join)
  let includeCondition: Includeable[] = [
    {
      model: Contact,
      as: "contact",
      attributes: [
        "id",
        "name",
        "number",
        "email",
        "profilePicUrl",
        "acceptAudioMessage",
        "active"
      ]
    },
    { model: Queue, as: "queue", attributes: ["id", "name", "color"] },
    { model: User, as: "user", attributes: ["id", "name"] },
    { model: Tag, as: "tags", attributes: ["id", "name", "color"] },
    { model: Whatsapp, as: "whatsapp", attributes: ["name", "expiresTicket"] }
  ];

  // Ajusta a condição onde (where) se showAll for true e o usuário for administrador
  if (showAll === "true" && isAdmin) {
    whereCondition = { queueId: { [Op.or]: [queueIds, null] }, companyId };
  }

  // Aplica filtros adicionais, se fornecidos
  if (status) {
    whereCondition = { ...whereCondition, status };
  }

  if (isGroup === "true") {
    whereCondition = { ...whereCondition, isGroup: true };
  }

  if (searchParam) {
    const sanitizedSearchParam = searchParam.toLocaleLowerCase().trim();
    includeCondition = [
      ...includeCondition,
      {
        model: Message,
        as: "messages",
        attributes: ["id", "body"],
        where: {
          body: where(
            fn("LOWER", col("body")),
            "LIKE",
            `%${sanitizedSearchParam}%`
          )
        },
        required: false,
        duplicating: false
      }
    ];
    whereCondition = {
      ...whereCondition,
      [Op.or]: [
        {
          "$contact.name$": where(
            fn("LOWER", col("contact.name")),
            "LIKE",
            `%${sanitizedSearchParam}%`
          )
        },
        { "$contact.number$": { [Op.like]: `%${sanitizedSearchParam}%` } },
        {
          "$message.body$": where(
            fn("LOWER", col("body")),
            "LIKE",
            `%${sanitizedSearchParam}%`
          )
        }
      ]
    };
  }

  if (date) {
    whereCondition = {
      ...whereCondition,
      createdAt: {
        [Op.between]: [+startOfDay(parseISO(date)), +endOfDay(parseISO(date))]
      }
    };
  }

  if (dateStart && dateEnd) {
    whereCondition = {
      ...whereCondition,
      updatedAt: {
        [Op.between]: [
          +startOfDay(parseISO(dateStart)),
          +endOfDay(parseISO(dateEnd))
        ]
      }
    };
  }

  if (updatedAt) {
    whereCondition = {
      ...whereCondition,
      updatedAt: {
        [Op.between]: [
          +startOfDay(parseISO(updatedAt)),
          +endOfDay(parseISO(updatedAt))
        ]
      }
    };
  }

  if (withUnreadMessages === "true") {
    const userQueueIds = user.queues.map(queue => queue.id);
    whereCondition = {
      ...whereCondition,
      [Op.or]: [{ userId }, { status: "pending" }],
      queueId: { [Op.or]: [userQueueIds, null] },
      unreadMessages: { [Op.gt]: 0 }
    };
  }

  if (Array.isArray(tags) && tags.length > 0) {
    const ticketsTagFilter: any[] | null = [];
    for (let tag of tags) {
      const ticketTags = await TicketTag.findAll({ where: { tagId: tag } });
      if (ticketTags) {
        ticketsTagFilter.push(ticketTags.map(t => t.ticketId));
      }
    }
    const ticketsIntersection: number[] = intersection(...ticketsTagFilter);
    whereCondition = {
      ...whereCondition,
      id: { [Op.in]: ticketsIntersection }
    };
  }

  if (Array.isArray(users) && users.length > 0) {
    const ticketsUserFilter: any[] | null = [];
    for (let user of users) {
      const ticketUsers = await Ticket.findAll({ where: { userId: user } });
      if (ticketUsers) {
        ticketsUserFilter.push(ticketUsers.map(t => t.id));
      }
    }
    const ticketsIntersection: number[] = intersection(...ticketsUserFilter);
    whereCondition = {
      ...whereCondition,
      id: { [Op.in]: ticketsIntersection }
    };
  }

  const limit = 40;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: tickets } = await Ticket.findAndCountAll({
    where: whereCondition,
    include: includeCondition,
    distinct: true,
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
    subQuery: false
  });

  const hasMore = count > offset + tickets.length;
  return { tickets, count, hasMore };
};

export default ListTicketsService;
