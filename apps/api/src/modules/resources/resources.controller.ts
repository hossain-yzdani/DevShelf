import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
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

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.resourcesService.findOneById(id);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(slug, updateResourceDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.resourcesService.remove(slug);
  }
}
