import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryMapper } from './category.mapper';
import { CategoryResponseDto } from './dto/response-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.find({
      relations: {
        resources: true,
      },
    });
    return CategoryMapper.toResponseDtoArray(categories);
  }

  async find(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.categoryRepository.findAndCount({
      skip: Number(skip),
      take: limit,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        resources: true,
      }
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(slug: string): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: {
        resources: true,
      },
    });
    if (!category) {
      throw new NotFoundException('Category was not found');
    }
    return CategoryMapper.toResponseDto(category);
  }

  async update(
    slug: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { slug } });
    if (!category) {
      throw new NotFoundException('Category was not found');
    }
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(slug: string): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { slug } });
    if (!category) {
      throw new NotFoundException('Category was not found');
    }
    await this.categoryRepository.remove(category);
  }
}
