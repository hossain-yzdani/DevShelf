import { Bot, InlineKeyboard } from "grammy";
import { TagService } from "../services/tsg.service";
import { backKeyboard } from "../keyboards/main.keyboard";

export function registerTagCalbacks(bot: Bot) {
  bot.callbackQuery("tags", async (ctx) => {
    try {
      const tags = await TagService.getAll();

      if (!tags || tags.length === 0) {
        await ctx.editMessageText("📂 **Categories**\n\nNo categories found.", {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        });
        return;
      }

      const keyboard = new InlineKeyboard();

      for (const tag of tags) {
        keyboard.text(`📂 ${tag.name}`, `tag_${tag.slug}`).success().row();
      }

      keyboard.text("↩️ Back", "back");

      await ctx.editMessageText(
        `📂 **Categories**\n\nTotal: ${tags.length} categories available.`,
        {
          reply_markup: keyboard,
          parse_mode: "Markdown",
        },
      );
    } catch (error) {
      await ctx.editMessageText(
        "❌ **Error**\n\nFailed to load tags. Please try again later.",
        {
          reply_markup: backKeyboard,
          parse_mode: "Markdown",
        },
      );
    }
  });

   bot.callbackQuery(/^tag_(.+)$/, async (ctx) => {
      const tagId = ctx.match[1];
  
      try {
        const resources =
          await TagService.getResourcesByTag(tagId);
  
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
  
        keyboard.text("↩️ Back to Tags", "tags").row();
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
