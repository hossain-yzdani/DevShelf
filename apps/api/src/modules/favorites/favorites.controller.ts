import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { BotAuthGuard } from '../auth/guards/botAuth.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.favoritesService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  async getStats() {
    return this.favoritesService.getStats();
  }

  @UseGuards(BotAuthGuard)
  @Get('my/:telegramId')
  async getMyFavorites(
    @Param('telegramId', new ParseIntPipe()) telegramId: number,
  ) {
    return this.favoritesService.getMyFavorites(telegramId);
  }

  @UseGuards(BotAuthGuard)
  @Post('check/:slug')
  async checkFavorite(
    @Body('telegramId', new ParseIntPipe()) telegramId: number,
    @Param('slug') slug: string,
  ) {
    const isFavorited = await this.favoritesService.isFavorited(
      telegramId,
      slug,
    );
    return { isFavorited };
  }

  @UseGuards(BotAuthGuard)
  @Post('toggle')
  @HttpCode(HttpStatus.OK)
  async toggleFavorite(
    @Body('resourceSlug') resourceSlug: string,
    @Body('telegramId', ParseIntPipe) telegramId: number,
  ) {
    return this.favoritesService.toggleFavorite(telegramId, resourceSlug);
  }
}
