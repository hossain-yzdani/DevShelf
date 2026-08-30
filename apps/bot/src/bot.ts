// src/bot.ts
import { Bot } from "grammy";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { registerCommands } from "./commands";
import { registerCallbacks } from "./callbacks";
import { registerMiddlewares } from "./middlewares";
import { registerErrorMiddleware } from "./middlewares/error.middleware";

async function bootstrap() {
  logger.info("🚀 Starting DevShelf Bot...");

  const bot = new Bot(env.BOT_TOKEN);

  registerMiddlewares(bot);

  registerCommands(bot);

  registerCallbacks(bot);

  registerErrorMiddleware(bot);

  bot.start({
    onStart: (botInfo) => {
      logger.info(`✅ Bot @${botInfo.username} is running!`);
      logger.info(`📍 Environment: ${env.NODE_ENV}`);
      logger.info(`📡 API Base URL: ${env.API_BASE_URL}`);
    },
    drop_pending_updates: true
  });

  process.on("SIGINT", () => {
    logger.info("🛑 Stopping bot...");
    bot.stop();
    process.exit(0);
  });
}

bootstrap().catch((error) => {
  logger.error("❌ Failed to start bot:", error);
  process.exit(1);
});
