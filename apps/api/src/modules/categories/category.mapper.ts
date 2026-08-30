import { CategoryResponseDto } from './dto/response-category.dto';
import { Category } from './entities/category.entity';

export class CategoryMapper {
  static toResponseDto(category: Category): CategoryResponseDto {
    return {
      id: category.id,
      slug: category.slug,
      name: category.name,
      description: category.description,
      resourcesCount: category.resources?.length || 0,
      resources: category?.resources.map((resource) => ({
        id: resource.id,
        name: resource.name,
        type: resource.type,
        slug: resource.slug,
        author: resource.author,
        createdAt: resource.createdAt,
      })),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static toResponseDtoArray(categories: Category[]): CategoryResponseDto[] {
    return categories.map((category) => this.toResponseDto(category));
  }
}
