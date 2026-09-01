import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { DownloadsService } from './downloads.service';
import { BotAuthGuard } from '../auth/guards/botAuth.guard';

@Controller('downloads')
export class DownloadsController {
  constructor(private downloadsService: DownloadsService) {}

  @Get()
  async findAll() {
    return await this.downloadsService.findAll();
  }

  @Get('stats')
  async getStats() {
    return await this.downloadsService.getStats();
  }

  @Get('resources/:slug')
  async getResource(@Param('slug') slug: string) {
    return await this.downloadsService.getResource(slug);
  }

  @UseGuards(BotAuthGuard)
  @Post()
  async create(@Body() createDownloadDto: CreateDownloadDto) {
    return await this.downloadsService.download(createDownloadDto);
  }

  // @UseGuards(BotAuthGuard)
  @Get('users/:telegramID')
  async findBy(@Param('telegramID', new ParseIntPipe()) telegramID: number) {
    return await this.downloadsService.getMyDownloads(telegramID);
  }
}
