import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Headers,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
// import { AuthGuard } from '../auth/auth.guard';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { BotAuthGuard } from '../auth/guards/botAuth.guard';

@Controller('favorites')
// @UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return this.favoritesService.getAll();
  }

  @Get('stats')
  async getStats() {
    return this.favoritesService.getStats();
  }

  @Get('resource/:slug')
  async getResource(@Param('slug') slug: string) {
    return this.favoritesService.getResource(slug);
  }

  @Post()
  async addFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.addFavorite(createFavoriteDto);
  }

  @Delete(':id')
  async removeFavorite(@Param('id') id: string) {
    return this.favoritesService.removeFavorite(id);
  }

  @Get('my/:telegramId')
  async getMyFavorites(@Param('telegramId', new ParseIntPipe()) telegramId: number) {
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

  @Get('user/:username')
  async getUserFavorites(@Param('username') username: string) {
    return this.favoritesService.getUserFavorites(username);
  }

  @Delete('slug/:slug')
  async removeFavoriteBySlug(
    @Headers('X-Username') username: string,
    @Param('slug') slug: string,
  ) {
    await this.favoritesService.removeFavoriteBySlug(username, slug);
    return { message: 'Favorite removed successfully' };
  }
}
