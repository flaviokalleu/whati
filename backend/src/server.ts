import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";
import Company from "./models/Company";
import { startQueueProcess } from "./queues";
import https from "https";
import fs from "fs";
import { checkAndSetupWebhooks } from "./controllers/SubscriptionController";

const server = app.listen(process.env.PORT, async () => {
  const companies = await Company.findAll();
  
  const allPromises: any[] = [];
  companies.map(async c => {
    const promise = StartAllWhatsAppsSessions(c.id);
    allPromises.push(promise);
  });

  Promise.all(allPromises).then(() => {
    startQueueProcess();
  });
  logger.info(`Server started on port: ${process.env.PORT}`);
  checkAndSetupWebhooks();
});

initIO(server);
gracefulShutdown(server);

