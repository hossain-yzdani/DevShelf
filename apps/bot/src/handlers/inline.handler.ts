import { Bot } from "grammy";
import { logger } from "../utils/logger";
import { ResourceService } from "../services/resource.service";
import {
  INLINE_RESULTS_LIMIT,
  INLINE_CACHE_TIME,
  buildInlineResult,
  buildEmptyResult,
  buildWelcomeResult,
} from "../utils/inline.utils";

export function registerInlineHandlers(bot: Bot) {
  bot.on("inline_query", async (ctx) => {
    const query = ctx.inlineQuery.query.trim().toLowerCase();
    const botUsername = ctx.me.username;

    try {
      if (!query) {
        await ctx.answerInlineQuery([buildWelcomeResult()], {
          cache_time: INLINE_CACHE_TIME,
          is_personal: false,
        });
        return;
      }

      const resources = await ResourceService.searchResources(
        query,
        INLINE_RESULTS_LIMIT,
      );

      if (!resources || resources.length === 0) {
        await ctx.answerInlineQuery([buildEmptyResult()], {
          cache_time: 10,
          is_personal: false,
        });
        return;
      }

      const results = resources.map((resource) =>
        buildInlineResult(resource, botUsername),
      );

      await ctx.answerInlineQuery(results, {
        cache_time: INLINE_CACHE_TIME,
        is_personal: false,
      });
    } catch (error) {
      logger.error({ query, error }, "Inline query failed");

      try {
        await ctx.answerInlineQuery(
          [
            {
              type: "article",
              id: "error",
              title: "❌ Search failed",
              description: "Please try again later",
              input_message_content: {
                message_text: "❌ Search failed. Please try again later.",
              },
            },
          ],
          { cache_time: 5 },
        );
      } catch (answerError) {
        logger.error({ answerError }, "Failed to answer inline query");
      }
    }
  });
}
