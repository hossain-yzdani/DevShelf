import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

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

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(slug, updateTagDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.tagsService.remove(slug);
  }
}
