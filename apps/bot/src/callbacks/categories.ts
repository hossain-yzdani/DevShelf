import { Bot } from "grammy";
import { CategoryService } from "../services/category.service";
import { backKeyboard } from "../keyboards/main.keyboard";
import { InlineKeyboard } from "grammy";
import { Resource } from "../../../../packages/types/resource.type";

export function registerCategoryCallbacks(bot: Bot) {
  bot.callbackQuery("categories", async (ctx) => {
    await ctx.answerCallbackQuery();
    await showCategoriesPage(ctx, 1);
  });

  bot.callbackQuery(/^categories_page_(\d+)$/, async (ctx) => {
    const page = parseInt(ctx.match[1], 10);
    await ctx.answerCallbackQuery();
    await showCategoriesPage(ctx, page);
  });

  bot.callbackQuery(/^category_(.+)$/, async (ctx) => {
    const categorySlug = ctx.match[1];

    try {
      const resources =
        await CategoryService.getResourcesByCategory(categorySlug);

      if (!resources || resources.length === 0) {
        await ctx.editMessageText(
          "📂 **Category Resources**\n\n" +
            "No resources found in this category.\n\n" +
            "💡 Try browsing other categories or check back later.",
          {
            reply_markup: backKeyboard,
            parse_mode: "Markdown",
          },
        );
        return;
      }

      const keyboard = new InlineKeyboard();

      resources.forEach((resource: Resource) => {
        keyboard
          .text(`📌 ${resource.name}`, `view_${resource.slug}`)
          .primary()
          .row();
      });

      keyboard.text("↩️ Back to Categories", "categories").row();

      await ctx.editMessageText(
        `📂 **Category Resources**\n\n` +
          `📊 Showing ${Math.min(resources.length, 10)} of ${resources.length} resources.\n\n` +
          `Click on any resource below to view details.\n` +
          `Each resource includes description, author, and download option.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );
    } catch (error) {
      await ctx.editMessageText(
        "❌ **Error**\n\n" +
          "Failed to load resources.\n\n" +
          "💡 Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
    }
  });
}

export async function showCategoriesPage(ctx: any, page: number = 1) {
  try {
    const categories = await CategoryService.fetchCategories(page, 10);

    if (!categories || categories.data.length === 0) {
      await ctx.editMessageText(
        "📂 **Categories**\n\nNo categories found.\n\n" +
          "💡 Please check back later or contact support.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
      return;
    }

    const keyboard = new InlineKeyboard();

    for (let i = 0; i < categories.data.length; i += 2) {
      const cat1 = categories.data[i];
      const cat2 = categories.data[i + 1];

      if (cat2) {
        keyboard
          .text(`📂 ${cat1.name}`, `category_${cat1.slug}`)
          .success()
          .text(`📂 ${cat2.name}`, `category_${cat2.slug}`)
          .success()
          .row();
      } else {
        keyboard
          .text(`📂 ${cat1.name}`, `category_${cat1.slug}`)
          .success()
          .row();
      }
    }

    const { totalPages } = categories.meta;

      if (page > 1) {
        keyboard.text("⬅️ Prev", `resources_page_${page - 1}`);
      } else {
        keyboard.text(" ", "noop");
      }

      keyboard.text(`📄 ${page} / ${totalPages}`, "noop");

      if (page < totalPages) {
        keyboard.text("Next ➡️", `resources_page_${page + 1}`);
      } else {
        keyboard.text(" ", "noop");
      }

      keyboard.row();
      keyboard.text("↩️ Back", "back");

    await ctx.editMessageText(
      `📂 **Categories**\n\n` +
        `📊 Total: ${categories.data.length} categories available.\n\n` +
        `Browse through our collection by selecting a category below.\n` +
        `Each category contains curated resources for you.`,
      {
        reply_markup: keyboard,
        parse_mode: "Markdown",
      },
    );
  } catch (error) {
    await ctx.editMessageText(
      "❌ **Error**\n\n" +
        "Failed to load categories. Please try again later.\n\n" +
        "💡 If the problem persists, contact support.",
      {
        reply_markup: backKeyboard,
        parse_mode: "Markdown",
      },
    );
  }
}
