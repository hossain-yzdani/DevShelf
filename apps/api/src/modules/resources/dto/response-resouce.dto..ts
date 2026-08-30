import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from 'src/common/enums/resourcesType.enum';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Resource } from '../entities/resource.entity';

class FavoriteInfo {
  @ApiProperty({ description: 'User ID' })
  userId!: string;
}

class DownloadInfo {
  @ApiProperty({ description: 'User ID' })
  userId!: string;
}

export class ResourceResponseDto {
  @ApiProperty({
    description: 'Unique resource ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Resource name',
    example: 'Advanced Node.js Programming',
  })
  name!: string;

  @ApiProperty({
    description: 'Resource slug',
    example: 'advanced-nodejs-programming',
  })
  slug!: string;

  @ApiProperty({
    description: 'Resource description',
    example: 'This resource covers advanced Node.js topics',
  })
  description!: string;

  @ApiProperty({
    description: 'Resource type',
    enum: ResourceType,
    example: ResourceType.BOOK,
  })
  type!: ResourceType;

  @ApiProperty({
    description: 'File URL of the resource',
    example: 'https://storage.example.com/files/book-123.pdf',
  })
  fileUrl!: string;

  @ApiProperty({
    description: 'Poster URL of the resource',
    example: 'https://storage.example.com/posters/book-123.jpg',
  })
  posterUrl!: string;

  @ApiProperty({
    description: 'Author name',
    example: 'John Doe',
  })
  author!: string;

  @ApiProperty({
    description: 'Resource category',
    type: () => Category,
  })
  category!: Category;

  @ApiProperty({
    description: 'Resource tags',
    type: [Tag],
  })
  tags!: Tag[];

  @ApiProperty({
    description: 'Number of favorites',
    example: 45,
  })
  favoritesCount!: number;

  // @ApiProperty({
  //   description: 'Favorites',
  //   example: 45,
  // })
  // favorites!: any[];

  @ApiProperty({
    description: 'Number of downloads',
    example: 120,
  })
  downloadsCount!: number;

  @ApiProperty({
    description: 'Creation date',
    example: '2026-01-15T10:30:00Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2026-08-25T14:20:00Z',
  })
  updatedAt!: Date;
}
