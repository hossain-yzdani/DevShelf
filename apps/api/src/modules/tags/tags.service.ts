import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { TagMapper } from './tag.mapper';
import { TagResponseDto } from './dto/response-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<CreateTagDto> {
    const tag = await this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  async findAll(): Promise<TagResponseDto[]> {
    const tags = await this.tagRepository.find({
      relations: {
        resources: true,
      },
    });
    return TagMapper.toResponseDtoArray(tags);
  }

  async findOne(slug: string): Promise<TagResponseDto> {
    const tag = await this.tagRepository.findOne({
      where: { slug },
      relations: {
        resources: true,
      },
    });
    if (!tag) {
      throw new NotFoundException('Tag was not found');
    }
    return TagMapper.toResponseDto(tag);
  }

  async update(slug: string, updateTagDto: UpdateTagDto): Promise<UpdateTagDto> {
    const tag = await this.tagRepository.findOne({ where: { slug } });
    if (!tag) {
      throw new NotFoundException('Tag was not found');
    }
    Object.assign(tag, updateTagDto);
    return await this.tagRepository.save(tag);
  }

  async remove(slug: string): Promise<void> {
    const tag = await this.tagRepository.findOne({ where: { slug } });
    if (!tag) {
      throw new NotFoundException('Tag was not found');
    }
    await this.tagRepository.remove(tag);
  }
}
