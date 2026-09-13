import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  find(@Query('limit') limit: string, @Query('page') page: string) {
    return this.tagsService.find(Number(page), Number(limit));
  }

  @Get('all')
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.tagsService.findOne(slug);
  }

  @UseGuards(AuthGuard)
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(slug, updateTagDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.tagsService.remove(slug);
  }
}
