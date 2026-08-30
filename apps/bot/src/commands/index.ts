import { Bot } from "grammy";
import { registerStartCommand } from "./start";
import { registerHelpCommand } from "./help";
import { registerAboutCommand } from "./about";

export function registerCommands(bot: Bot) {
  registerStartCommand(bot);
  registerHelpCommand(bot);
  registerAboutCommand(bot);
}
