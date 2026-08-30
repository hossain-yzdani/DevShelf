import { ApiProperty } from '@nestjs/swagger';

class ResourceInfo {
  @ApiProperty({ description: 'Resource ID' })
  id!: string;

  @ApiProperty({ description: 'Resource name' })
  name!: string;

  @ApiProperty({ description: 'Resource type' })
  type!: string;

  @ApiProperty({ description: 'Resource author' })
  author!: string;

  @ApiProperty({ description: 'Created at' })
  createdAt!: Date;
}

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Category slug',
    example: 'programming',
  })
  slug!: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Programming',
  })
  name!: string;

  @ApiProperty({
    description: 'Category description',
    example: 'All programming languages and frameworks',
  })
  description!: string;

  @ApiProperty({
    description: 'Number of resources in this category',
    example: 42,
  })
  resourcesCount!: number;

  @ApiProperty({
    description: 'Recent resources in this category',
    type: [ResourceInfo],
    required: false,
  })
  resources?: ResourceInfo[];

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
