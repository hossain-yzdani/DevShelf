import { Bot, webhookCallback } from "grammy";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { registerCommands } from "./commands";
import { registerCallbacks } from "./callbacks";
import { registerMiddlewares } from "./middlewares";
import { registerErrorMiddleware } from "./middlewares/error.middleware";

logger.info("🚀 Starting DevShelf Bot...");

const bot = new Bot(env.BOT_TOKEN);

registerMiddlewares(bot);

registerCommands(bot);

registerCallbacks(bot);

registerErrorMiddleware(bot);

process.on("SIGINT", () => {
  logger.info("🛑 Stopping bot...");
  bot.stop();
  process.exit(0);
});

export default webhookCallback(bot, "http");


// bootstrap().catch((error) => {
//   logger.error("❌ Failed to start bot:", error);
//   process.exit(1);
// });
