import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  find(@Query('limit') limit: string, @Query('page') page: string) {
    return this.resourcesService.find(Number(page), Number(limit));
  }

  @Get('all')
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search resources by query' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of results',
  })
  async search(@Query('q') query: string, @Query('limit') limit?: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.resourcesService.searchResources(query, limitNumber);
  }

  @Get('popular')
  async getPopular(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.resourcesService.getPopular(limitNumber);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.resourcesService.findOne(slug);
  }

  @UseGuards(AuthGuard)
  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.resourcesService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(slug, updateResourceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.resourcesService.remove(slug);
  }
}
