import { TagResponseDto } from './dto/response-tag.dto';
import { Tag } from './entities/tag.entity';

export class TagMapper {
  static toResponseDto(tag: Tag): TagResponseDto {
    return {
      id: tag.id,
      slug: tag.slug,
      name: tag.name,
      description: tag.description,
      resourcesCount: tag.resources?.length || 0,
      resources: tag.resources.map((resource) => ({
        id: resource.id,
        name: resource.name,
        type: resource.type,
        slug: resource.slug,
        author: resource.author,
        createdAt: resource.createdAt,
      })),
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }

  static toResponseDtoArray(tags: Tag[]): TagResponseDto[] {
    return tags.map((tag) => this.toResponseDto(tag));
  }
}
