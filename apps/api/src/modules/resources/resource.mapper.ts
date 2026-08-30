import { ResourceResponseDto } from './dto/response-resouce.dto.';
import { Resource } from './entities/resource.entity';

export class ResourceMapper {
  static toResponseDto(resource: Resource): ResourceResponseDto {
    return {
      id: resource.id,
      name: resource.name,
      slug: resource.slug,
      description: resource.description,
      type: resource.type,
      fileUrl: resource.fileUrl,
      posterUrl: resource.posterUrl,
      author: resource.author,
      category: resource.category,
      tags: resource.tags,
      // favorites: resource.favorites,
      favoritesCount: resource.favorites?.length,
      downloadsCount: resource.downloads?.length,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    };
  }

  static toResponseDtoArray(resources: Resource[]): ResourceResponseDto[] {
    return resources.map((resource) => this.toResponseDto(resource));
  }
}