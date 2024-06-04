import { WAMessage, AnyMessageContent } from "@whiskeysockets/baileys";
import * as Sentry from "@sentry/node";
import fs from "fs";
import { exec } from "child_process";
import path from "path";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import AppError from "../../errors/AppError";
import GetTicketWbot from "../../helpers/GetTicketWbot";
import Ticket from "../../models/Ticket";
import mime from "mime-types";
import formatBody from "../../helpers/Mustache";

interface Request {
  media: Express.Multer.File;
  ticket: Ticket;
  body?: string;
}

const publicFolder = path.resolve(__dirname, "..", "..", "..", "public");

const processAudio = async (audio: string): Promise<string> => {
  const outputAudio = `${publicFolder}/${new Date().getTime()}.mp3`;
  return new Promise((resolve, reject) => {
    exec(
      `${ffmpegPath.path} -i ${audio} -vn -ab 128k -ar 44100 -f ipod ${outputAudio} -y`,
      (error, _stdout, _stderr) => {
        if (error) reject(error);
        fs.unlinkSync(audio);
        resolve(outputAudio);
      }
    );
  });
};

const processAudioFile = async (audio: string): Promise<string> => {
  const outputAudio = `${publicFolder}/${new Date().getTime()}.mp3`;
  return new Promise((resolve, reject) => {
    exec(
      `${ffmpegPath.path} -i ${audio} -vn -ar 44100 -ac 2 -b:a 192k ${outputAudio}`,
      (error, _stdout, _stderr) => {
        if (error) reject(error);
        fs.unlinkSync(audio);
        resolve(outputAudio);
      }
    );
  });
};

export const getMessageOptions = async (
  fileName: string,
  pathMedia: string,
  body?: string
): Promise<any> => {
  const mimeType = mime.lookup(pathMedia);
  const typeMessage = mimeType.split("/")[0];

  try {
    if (!mimeType) {
      throw new Error("Invalid mimetype");
    }
    let options: AnyMessageContent;

    if (typeMessage === "video") {
      options = {
        video: fs.readFileSync(pathMedia),
        caption: body ? body : '',
        fileName: fileName
        // gifPlayback: true
      };
    } else if (typeMessage === "audio") {
      const typeAudio = true; //fileName.includes("audio-record-site");
      const convert = await processAudio(pathMedia);
      if (typeAudio) {
        options = {
          audio: fs.readFileSync(convert),
          mimetype: typeAudio ? "audio/mp4" : mimeType,
          caption: body ? body : null,
          ptt: true
        };
      } else {
        options = {
          audio: fs.readFileSync(convert),
          mimetype: typeAudio ? "audio/mp4" : mimeType,
          caption: body ? body : null,
          ptt: true
        };
      }
    } else if (typeMessage === "document") {
      options = {
        document: fs.readFileSync(pathMedia),
        caption: body ? body : null,
        fileName: fileName,
        mimetype: mimeType
      };
    } else if (typeMessage === "application") {
      options = {
        document: fs.readFileSync(pathMedia),
        caption: body ? body : null,
        fileName: fileName,
        mimetype: mimeType
      };
    } else {
      options = {
        image: fs.readFileSync(pathMedia),
        caption: body ? body : null
      };
    }

    return options;
  } catch (e) {
    Sentry.captureException(e);
    console.log(e);
    return null;
  }
};

const SendWhatsAppMedia = async ({
  media,
  ticket,
  body
}: Request): Promise<WAMessage> => {
  try {
    const wbot = await GetTicketWbot(ticket);

    const pathMedia = media.path;
    const typeMessage = media.mimetype.split("/")[0];
    let options: AnyMessageContent;
    const bodyMessage = formatBody(body, ticket.contact)

    if (typeMessage === "video") {
      options = {
        video: fs.readFileSync(pathMedia),
        caption: bodyMessage,
        fileName: media.originalname
        // gifPlayback: true
      };
    } else if (typeMessage === "audio") {
      const typeAudio = media.originalname.includes("audio-record-site");
      if (typeAudio) {
        const convert = await processAudio(media.path);
        options = {
          audio: fs.readFileSync(convert),
          mimetype: typeAudio ? "audio/mp4" : media.mimetype,
          ptt: true
        };
      } else {
        const convert = await processAudioFile(media.path);
        options = {
          audio: fs.readFileSync(convert),
          mimetype: typeAudio ? "audio/mp4" : media.mimetype
        };
      }
    } else if (typeMessage === "document" || typeMessage === "text") {
      options = {
        document: fs.readFileSync(pathMedia),
        caption: bodyMessage,
        fileName: media.originalname,
        mimetype: media.mimetype
      };
    } else if (typeMessage === "application") {
      options = {
        document: fs.readFileSync(pathMedia),
        caption: bodyMessage,
        fileName: media.originalname,
        mimetype: media.mimetype
      };
    } else {
      options = {
        image: fs.readFileSync(pathMedia),
        caption: bodyMessage,
      };
    }

    const sentMessage = await wbot.sendMessage(
      `${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
      {
        ...options
      }
    );

    await ticket.update({ lastMessage: bodyMessage });

    return sentMessage;
  } catch (err) {
    Sentry.captureException(err);
    console.log(err);
    throw new AppError("ERR_SENDING_WAPP_MSG");
  }
};

export default SendWhatsAppMedia;

export const SendWhatsAppMediaFileAddress = async (
  media: string,
  ticket: Ticket,
  body: string): Promise<WAMessage> => {

    try {
      const wbot = await GetTicketWbot(ticket);
      if (media.startsWith('http')) {
        media = './public' + media.split('/public')[1];
      }
      console.log("media", media, "mime", getMimeType(media));
      const pathMedia = media;
      const typeMessage = getMimeType(media).split("/")[0];
      let options: AnyMessageContent;

      if (typeMessage === "video") {
        options = {
          video: fs.readFileSync(pathMedia),
          caption: body,
          fileName: extractFileName(media)
          // gifPlayback: true
        };
      } else if (typeMessage === "audio") {
        const typeAudio = media.includes("audio-record-site");
        if (typeAudio) {
          const convert = await processAudio(media);
          options = {
            audio: fs.readFileSync(convert),
            mimetype: typeAudio ? "audio/mp4" : getMimeType(media),
            ptt: true
          };
        } else {
          const convert = await processAudioFile(media);
          options = {
            audio: fs.readFileSync(convert),
            mimetype: typeAudio ? "audio/mp4" : getMimeType(media)
          };
        }
      } else if (typeMessage === "document" || typeMessage === "text") {
        options = {
          document: fs.readFileSync(pathMedia),
          caption: body,
          fileName: extractFileName(media),
          mimetype: getMimeType(media)
        };
       } else if (typeMessage === "application") {
        options = {
          document: fs.readFileSync(pathMedia),
          caption: body,
          fileName: extractFileName(media),
          mimetype: getMimeType(media)
        };
      } else {
        options = {
          image: fs.readFileSync(pathMedia),
          caption: body
        };
      }

      const sentMessage = await wbot.sendMessage(
        `${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`,
        {
          ...options
        }
      );

      await ticket.update({ lastMessage: extractFileName(media) });

      return sentMessage;
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
      throw new AppError("ERR_SENDING_WAPP_MSG");
    }
};

const extractFileName = (localFile: string): string => {
  const file = localFile.split("/");
  return file[file.length - 1];
}

const extractFilePath = (localFile: string): string => {
  const file = localFile.split("/");
  file.pop();
  return file.join("/");
}

const getMimeType = (localFile: string): string => {
  const file = localFile.split(".");
  const extension = file[file.length - 1];
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    m4a: "audio/mp4",
    ogg: "audio/ogg",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    rtf: "application/rtf",
    csv: "text/csv",
    html: "text/html",
    zip: "application/zip",
    rar: "application/x-rar-compressed",
    "7z": "application/x-7z-compressed",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    "3ga": "video/3gpp",
    "7gp": "video/3gpp2",
    "7ga": "video/3gpp",
    "3gpp": "video/3gpp",
    "3gpp2": "video/3gpp2",
    "7gpp": "video/3gpp",
    "7gpp2": "video/3gpp2",
    "3gpp-tt": "video/3gpp",
    "3gpp2-tt": "video/3gpp2",
    "7gpp-tt": "video/3gpp",
    "7gpp2-tt": "video/3gpp2",
    "3gpp-rtt": "video/3gpp",
    "3gpp2-rtt": "video/3gpp2",
    "7gpp-rtt": "video/3gpp",
    "7gpp2-rtt": "video/3gpp2",
    "3gpp-sms": "video/3gpp",
    "3gpp2-sms": "video/3gpp2",
    "7gpp-sms": "video/3gpp",
    "7gpp2-sms": "video/3gpp2",
    pdfa: "application/pdf",
    "x-pdf": "application/pdf",
  };
  if (mimeTypes[extension]) {
    return mimeTypes[extension];
  }
  return "application/octet-stream";
}
