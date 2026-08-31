import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BOT_IS_PUBLIC_KEY } from 'src/common/decorators/bot-public.decorator';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class BotAuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      BOT_IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const telegramId = request.headers['x-telegram-id'];

    if (!telegramId) {
      throw new UnauthorizedException('Telegram ID required');
    }

    const user = await this.usersService.findOneByTelegramId(telegramId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;
    return true;
  }
}
