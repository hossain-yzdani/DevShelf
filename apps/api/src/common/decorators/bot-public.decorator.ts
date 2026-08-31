import { SetMetadata } from '@nestjs/common';

export const BOT_IS_PUBLIC_KEY = 'botIsPublic';
export const BotPublic = () => SetMetadata(BOT_IS_PUBLIC_KEY, true);
