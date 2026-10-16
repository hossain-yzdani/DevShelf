import { Bot, webhookCallback } from "grammy";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { registerCommands } from "./commands";
import { registerCallbacks } from "./callbacks";
import { registerMiddlewares } from "./middlewares";
import { registerErrorMiddleware } from "./middlewares/error.middleware";
import { registerKeyboardHandlers } from "./handlers/keyboard.handler";

logger.info("🚀 Starting DevShelf Bot...");

const bot = new Bot(env.BOT_TOKEN);

registerMiddlewares(bot);

registerCommands(bot);

registerCallbacks(bot);

registerErrorMiddleware(bot);

registerKeyboardHandlers(bot);

bot.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query.trim();

  const results = [
    {
      type: "article" as const,
      id: "1",
      title: "React Documentation",
      description: "Official React documentation",
      input_message_content: {
        message_text: "https://react.dev",
      },
    },
    {
      type: "article" as const,
      id: "2",
      title: "NestJS Documentation",
      description: "Official NestJS documentation",
      input_message_content: {
        message_text: "https://docs.nestjs.com",
      },
    },
  ];

  await ctx.answerInlineQuery(results, {
    cache_time: 0,
  });
});

process.on("SIGINT", () => {
  logger.info("🛑 Stopping bot...");
  bot.stop();
  process.exit(0);
});

export default webhookCallback(bot, "http");


// async function bootstrap() {
//   try {
//     await bot.init();
//     logger.info(`🤖 Bot @${bot.botInfo.username} started`);

//     // ✅ polling به جای webhook
//     bot.start({
//       onStart: (botInfo) => {
//         logger.info(`✅ Bot @${botInfo.username} is running (polling mode)`);
//       },
//     });
//   } catch (error) {
//     logger.error({ error }, "❌ Failed to start bot");
//     process.exit(1);
//   }
// }

// bootstrap();
