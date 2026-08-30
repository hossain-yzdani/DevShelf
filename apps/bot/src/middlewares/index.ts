import { Bot } from "grammy";
import { logger } from "../utils/logger";

export function registerMiddlewares(bot: Bot) {
  bot.use(async (ctx, next) => {
    const startTime = Date.now();

    try {
      await next();
    } finally {
      const duration = Date.now() - startTime;
      logger.debug(
        {
          updateType: ctx.update,
          userId: ctx.from?.id,
          duration,
        },
        "Update processed",
      );
    }
  });
}
