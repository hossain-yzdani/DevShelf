import { Bot, Context } from "grammy";
import { logger } from "../utils/logger";

export function registerErrorMiddleware(bot: Bot) {
  bot.catch(async (error: any) => {
    const ctx = error.ctx as Context;
    const userId = ctx?.from?.id;

    logger.error(
      {
        error: error.message,
        userId,
        updateType: ctx?.update,
        stack: error.stack,
      },
      "❌ Bot error",
    );

    if (ctx) {
      try {
        await ctx.reply("❌ خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      } catch (replyError) {
        logger.error(replyError, "Failed to send error reply");
      }
    }
  });
}
