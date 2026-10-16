import { Bot } from "grammy";
import { accountHandler } from "../handlers/acccount.handler";

export function registerAccountCallbacks(bot: Bot) {
  bot.callbackQuery("myAccount", async (ctx) => {
    accountHandler(ctx);
  });

  // bot.callbackQuery("toggleNotifications", async (ctx) => {
  //   const telegramId = ctx.from?.id;

  //   try {
  //     const user = await UserService.toggleNotifications(telegramId);

  //     await ctx.answerCallbackQuery(
  //       user.notifications
  //         ? "🔔 Notifications enabled"
  //         : "🔕 Notifications disabled",
  //     );

  //     const message = formatAccountMessage(user);
  //     const keyboard = buildAccountKeyboard(user.notifications);

  //     await ctx.editMessageText(message, {
  //       parse_mode: "HTML",
  //       reply_markup: keyboard,
  //     });
  //   } catch (error) {
  //     logger.error({ telegramId, error }, "Failed to toggle notifications");
  //     await ctx.answerCallbackQuery("❌ Failed to update!");
  //   }
  // });
}

