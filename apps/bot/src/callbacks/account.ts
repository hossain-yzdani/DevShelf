import { Bot, InlineKeyboard } from "grammy";
import { logger } from "../utils/logger";
import { UserService } from "../services/user.service";

export function registerAccountCallbacks(bot: Bot) {
  bot.callbackQuery("myAccount", async (ctx) => {
    const telegramId = ctx.from.id;

    try {
      await ctx.answerCallbackQuery();

      const user = await UserService.getUserByTgId(telegramId);

      console.log(user);

      const message = formatAccountMessage(user);
      const keyboard = buildAccountKeyboard(true);

      await ctx.editMessageText(message, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    } catch (error) {
      logger.error({ telegramId , error }, "Failed to show account");
      await ctx.answerCallbackQuery("❌ Failed to load account!");
    }
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

function buildAccountKeyboard(notificationsEnabled: boolean): InlineKeyboard {
  return new InlineKeyboard()
    .text("❤️ My Favorites", "myFavorites")
    .danger()
    .text("📥 My Downloads", "myDownloads")
    .danger()
    .row()
    .text(
      notificationsEnabled
        ? "🔕 Disable Notifications"
        : "🔔 Enable Notifications",
      "toggleNotifications",
    )
    .primary()
    .row()
    .text("🔙 Back", "back");
}

function formatAccountMessage(user: any): string {
  const displayName =
    user.firstName || user.lastName
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : user.username || "User";

  const notificationsStatus = user.notifications ? "🔔 Enabled" : "🔕 Disabled";

  return (
    `👤 <b>My Account</b>\n\n` +
    `📛 <b>Name:</b> ${displayName}\n` +
    `🆔 <b>Username:</b> @${user.username || "—"}\n` +
    `🔔 <b>Notifications:</b> ${notificationsStatus}\n\n` +
    `📊 <b>Statistics:</b>\n` +
    `❤️ ${user.favoritesCount ?? 0} favorites\n` +
    `📥 ${user.downloadsCount ?? 0} downloads\n\n` +
    `📅 <b>Member since:</b> ${new Date(user.createdAt).toLocaleDateString("en-US")}`
  );
}
