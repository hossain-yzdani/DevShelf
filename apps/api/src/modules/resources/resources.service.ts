import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceResponseDto } from './dto/response-resouce.dto.';
import { Resource } from './entities/resource.entity';
import { ResourceMapper } from './resource.mapper';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createResourceDto: CreateResourceDto,
  ): Promise<ResourceResponseDto> {
    const resource = this.resourceRepository.create({
      ...createResourceDto,
      category: { id: createResourceDto.category },
      tags: createResourceDto.tags?.map((id) => ({ id })) || [],
    });
    const saved = await this.resourceRepository.save(resource);
    const loaded = await this.resourceRepository.findOne({
      where: { slug: saved.slug },
      relations: {
        category: true,
        tags: true,
        favorites: true,
        downloads: true,
      },
    });

    return ResourceMapper.toResponseDto(loaded!);
  }

  async findAll(): Promise<ResourceResponseDto[]> {
    const resources = await this.resourceRepository.find({
      relations: {
        category: true,
        tags: true,
        favorites: true,
        downloads: true,
      },
    });
    return ResourceMapper.toResponseDtoArray(resources);
  }

  async findOne(slug: string): Promise<ResourceResponseDto> {
    const resource = await this.resourceRepository.findOne({
      where: { slug },
      relations: {
        category: true,
        tags: true,
        favorites: true,
        downloads: true,
      },
    });
    if (!resource) {
      throw new NotFoundException('Resource was not found');
    }
    return ResourceMapper.toResponseDto(resource);
  }

  async findOneById(id: string): Promise<ResourceResponseDto> {
    const resource = await this.resourceRepository.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
        favorites: true,
        downloads: true,
      },
    });
    if (!resource) {
      throw new NotFoundException('Resource was not found');
    }
    return ResourceMapper.toResponseDto(resource);
  }

  async update(
    slug: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceResponseDto> {
    const resource = await this.resourceRepository.findOne({
      where: { slug },
      relations: {
        category: true,
        tags: true,
        favorites: true,
        downloads: true,
      },
    });

    if (!resource) {
      throw new NotFoundException('Resource was not found');
    }

    const { category, tags, ...data } = updateResourceDto;

    if (category !== undefined) {
      const categoryEntity = await this.categoryRepository.findOne({
        where: { id: category },
      });

      if (!categoryEntity) {
        throw new NotFoundException('Category was not found');
      }

      resource.category = categoryEntity;
    }

    if (tags !== undefined) {
      resource.tags = await this.tagRepository.find({
        where: tags.map((id) => ({ id })),
      });
    }

    this.resourceRepository.merge(resource, data);

    const saved = await this.resourceRepository.save(resource);

    const loaded = await this.resourceRepository.findOne({
      where: { id: saved.id },
      relations: {
        category: true,
        tags: true,
        favorites: true,
        downloads: true,
      },
    });

    return ResourceMapper.toResponseDto(loaded!);
  }

  async remove(slug: string): Promise<void> {
    const resource = await this.resourceRepository.findOne({ where: { slug } });
    if (!resource) {
      throw new NotFoundException('Resource was not found');
    }
    await this.resourceRepository.remove(resource);
  }

  async getPopular(limit: number = 10): Promise<Resource[]> {
    return this.resourceRepository
      .createQueryBuilder('resource')
      .leftJoinAndSelect('resource.category', 'category')
      .leftJoinAndSelect('resource.tags', 'tags')
      .leftJoin('resource.favorites', 'favorite')
      .addSelect('COUNT(favorite.id)', 'favoritesCount')
      .groupBy('resource.id')
      .addGroupBy('category.id')
      .addGroupBy('tags.id')
      .orderBy('COUNT(favorite.id)', 'DESC')
      .limit(limit)
      .getMany();
  }

  async searchResources(
    query: string,
    limit: number = 10,
  ): Promise<Resource[]> {
    const search = `%${query.trim()}%`;

    const resources = await this.resourceRepository
      .createQueryBuilder('resource')
      .leftJoinAndSelect('resource.category', 'category')
      .leftJoinAndSelect('resource.tags', 'tags')
      .where('resource.name ILIKE :search', { search })
      .orWhere('resource.description ILIKE :search', { search })
      .orWhere('resource.author ILIKE :search', { search })
      .orWhere('category.name ILIKE :search', { search })
      .orWhere('tags.name ILIKE :search', { search })
      .orderBy('resource.createdAt', 'DESC')
      .take(limit)
      .getMany();

    return resources;
  }

  async advancedSearch(
    filters: {
      query?: string;
      type?: string;
      categoryId?: string;
      tagId?: string;
      author?: string;
    },
    limit: number = 10,
  ): Promise<Resource[]> {
    const queryBuilder = this.resourceRepository
      .createQueryBuilder('resource')
      .leftJoinAndSelect('resource.category', 'category')
      .leftJoinAndSelect('resource.tags', 'tags');

    if (filters.query) {
      queryBuilder.andWhere(
        '(resource.name ILIKE :query OR resource.description ILIKE :query OR resource.author ILIKE :query)',
        { query: `%${filters.query}%` },
      );
    }

    if (filters.type) {
      queryBuilder.andWhere('resource.type = :type', { type: filters.type });
    }

    if (filters.categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    if (filters.tagId) {
      queryBuilder.andWhere('tags.id = :tagId', { tagId: filters.tagId });
    }

    if (filters.author) {
      queryBuilder.andWhere('resource.author ILIKE :author', {
        author: `%${filters.author}%`,
      });
    }

    return queryBuilder
      .orderBy('resource.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  }
}
