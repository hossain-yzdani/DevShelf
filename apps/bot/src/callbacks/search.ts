import { Bot, InlineKeyboard } from "grammy";
import { backKeyboard } from "../keyboards/main.keyboard";
import { logger } from "../utils/logger";
import { ResourceService } from "../services/resource.service";

const searchState = new Map<number, boolean>();

export function registerSearchCallbacks(bot: Bot) {
  bot.callbackQuery("search", async (ctx) => {
    const userId = ctx.from?.id;

    if (!userId) {
      await ctx.answerCallbackQuery("⚠️ User ID not found!");
      return;
    }

    searchState.set(userId, true);

    await ctx.editMessageText(
      "🔍 **Search Resources**\n\n" +
        "Please send your search query.\n\n" +
        "📝 Examples:\n" +
        "• `nestjs` - search by name\n" +
        "• `programming` - search by category\n" +
        "• `John Doe` - search by author\n\n" +
        "⏹️ Type `/cancel` to cancel search.",
      {
        reply_markup: backKeyboard,
        parse_mode: "Markdown",
      },
    );

    logger.info({ userId }, "🔍 Search mode activated");
  });

  bot.on("message:text", async (ctx) => {
    const userId = ctx.from?.id;
    const text = ctx.message.text;

    if (!userId) return;

    if (!searchState.get(userId)) return;

    if (text === "/cancel") {
      searchState.delete(userId);
      await ctx.reply(
        "❌ Search cancelled.\n\n" + "Use the menu to start a new search.",
        {
          reply_markup: require("../keyboards/main.keyboard").mainKeyboard,
          parse_mode: "Markdown",
        },
      );
      return;
    }

    await handleSearch(ctx, text);
  });
}

async function handleSearch(ctx: any, query: string) {
  const userId = ctx.from?.id;

  try {
    await ctx.replyWithChatAction("typing");
    await ctx.reply("⏳ Searching for resources...");

    const resources = await ResourceService.searchResources(query, 10);

    searchState.delete(userId);

    if (!resources || resources.length === 0) {
      await ctx.reply(
        `❌ **No results found for:**\n"${query}"\n\n` +
          "💡 Try:\n" +
          "• Using different keywords\n" +
          "• Checking the spelling\n" +
          "• Browsing categories instead",
        {
          reply_markup: require("../keyboards/main.keyboard").mainKeyboard,
          parse_mode: "Markdown",
        },
      );
      return;
    }

    const keyboard = new InlineKeyboard();

    for (let i = 0; i < resources.length; i += 2) {
      const res1 = resources[i];
      const res2 = resources[i + 1];

      if (res2) {
        keyboard
          .text(`📌 ${res1.name}`, `view_${res1.slug}`)
          .primary()
          .text(`📌 ${res2.name}`, `view_${res2.slug}`)
          .primary()
          .row();
      } else {
        keyboard.text(`📌 ${res1.name}`, `view_${res1.slug}`).primary().row();
      }
    }

    keyboard.text("🔄 New Search", "search");
    keyboard.row();
    keyboard.text("↩️ Main Menu", "back");

    await ctx.reply(
      `🔍 **Search Results**\n\n` +
        `📊 Found ${resources.length} result${resources.length > 1 ? "s" : ""} for:\n` +
        `"${query}"\n\n` +
        `📌 Click on any resource to view details.`,
      {
        reply_markup: keyboard,
        parse_mode: "Markdown",
      },
    );

    logger.info(
      { userId, query, count: resources.length },
      "🔍 Search completed",
    );
  } catch (error) {
    logger.error({ userId, query, error }, "Search failed");
    searchState.delete(userId);

    await ctx.reply(
      "❌ **Error**\n\n" +
        "Failed to search resources. Please try again later.",
      {
        reply_markup: require("../keyboards/main.keyboard").mainKeyboard,
        parse_mode: "Markdown",
      },
    );
  }
}
