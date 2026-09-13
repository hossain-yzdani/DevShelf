import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('searches')
export class SearchesController {
  constructor(private readonly searchesService: SearchesService) {}

  @Post()
  create(@Body() createSearchDto: CreateSearchDto) {
    return this.searchesService.create(createSearchDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.searchesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchDto: UpdateSearchDto) {
    return this.searchesService.update(+id, updateSearchDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchesService.remove(+id);
  }
}
