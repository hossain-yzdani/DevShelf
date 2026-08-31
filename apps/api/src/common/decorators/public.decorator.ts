import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'botIsPublic';
export const BotPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
