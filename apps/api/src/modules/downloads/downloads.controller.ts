import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { DownloadsService } from './downloads.service';

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

  @Post()
  async create(@Body() createDownloadDto: CreateDownloadDto) {
    return await this.downloadsService.download(createDownloadDto);
  }

  @Get('users/:username')
  async findBy(@Param('username') username: string) {
    return await this.downloadsService.getMyDownloads(username);
  }
}
