import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const TelegramId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const telegramId = request.headers['x-telegram-id'];

    if (!telegramId) {
      throw new BadRequestException('X-Telegram-Id header is required');
    }

    return parseInt(telegramId.toString(), 10);
  }
)