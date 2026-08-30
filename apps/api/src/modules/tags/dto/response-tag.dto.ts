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

export class TagResponseDto {
  @ApiProperty({
    description: 'Tag ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Unique slug of the tag',
    example: 'nestjs',
  })
  slug!: string;

  @ApiProperty({
    description: 'Unique name of the tag',
    example: 'NestJS',
  })
  name!: string;

  @ApiProperty({
    description: 'Description of the tag',
    example: 'NestJS framework for building efficient Node.js applications',
  })
  description!: string;

  @ApiProperty({
    description: 'Number of resources with this tag',
    example: 25,
  })
  resourcesCount!: number;

  @ApiProperty({
    description: 'Number of resources with this tag',
    example: 25,
  })
  resources!: ResourceInfo[];

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
