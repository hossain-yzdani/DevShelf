import { Bot } from "grammy";
import { CategoryService } from "../services/category.service";
import { backKeyboard } from "../keyboards/main.keyboard";
import { InlineKeyboard } from "grammy";

export function registerCategoryCallbacks(bot: Bot) {
  bot.callbackQuery("categories", async (ctx) => {
    try {
      const categories = await CategoryService.getAll();

      if (!categories || categories.length === 0) {
        await ctx.editMessageText("📂 **Categories**\n\nNo categories found.", {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        });
        return;
      }

      const keyboard = new InlineKeyboard();

      for (const cat of categories) {
        keyboard.text(`📂 ${cat.name}`, `category_${cat.slug}`).success().row();
      }

      keyboard.text("↩️ Back", "back");

      await ctx.editMessageText(
        `📂 **Categories**\n\nTotal: ${categories.length} categories available.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );
    } catch (error) {
      await ctx.editMessageText(
        "❌ **Error**\n\nFailed to load categories. Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
    }
  });

  bot.callbackQuery(/^category_(.+)$/, async (ctx) => {
    const categoryId = ctx.match[1];

    try {
      const resources =
        await CategoryService.getResourcesByCategory(categoryId);

      if (!resources || resources.length === 0) {
        await ctx.editMessageText(
          "📂 **Category Resources**\n\nNo resources found in this category.",
          {
            reply_markup: backKeyboard,
            parse_mode: "Markdown",
          },
        );
        return;
      }

      const keyboard = new InlineKeyboard();
      

      for (const resource of resources.slice(0, 10)) {
        keyboard.text(`📌 ${resource.name}`, `view_${resource.slug}`).primary().row();
      }

      keyboard.text("↩️ Back to Categories", "categories").row();
      // keyboard.text("↩️ Main Menu", "back").row();

      await ctx.editMessageText(
        `📂 **Category Resources**\n\n` +
          `Showing ${Math.min(resources.length, 10)} of ${resources.length} resources.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );
    } catch (error) {
      await ctx.editMessageText("❌ **Error**\n\nFailed to load resources.", {
        reply_markup: backKeyboard,
        parse_mode: "Markdown",
      });
    }
  });
}
