import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
  Min,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceType } from 'src/common/enums/resourcesType.enum';

export class ResourceFilterDto {
  @ApiProperty({
    description: 'Search by name or description',
    example: 'Node.js',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Search text must be a string' })
  search?: string;

  @ApiProperty({
    description: 'Filter by resource type',
    enum: ResourceType,
    required: false,
  })
  @IsOptional()
  @IsEnum(ResourceType, { message: 'Invalid resource type' })
  type?: ResourceType;

  @ApiProperty({
    description: 'Filter by category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid category ID format' })
  categoryId?: string;

  @ApiProperty({
    description: 'Filter by tag IDs',
    example: ['tag-uuid-1', 'tag-uuid-2'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @IsUUID('4', { each: true, message: 'Invalid tag ID format' })
  tagIds?: string[];

  @ApiProperty({
    description: 'Filter by author name',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Author name must be a string' })
  author?: string;

  @ApiProperty({
    description: 'Filter resources with minimum favorites count',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Count must be an integer' })
  @Min(0, { message: 'Count cannot be negative' })
  minFavorites?: number;

  @ApiProperty({
    description: 'Filter resources with minimum downloads count',
    example: 5,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Count must be an integer' })
  @Min(0, { message: 'Count cannot be negative' })
  minDownloads?: number;

  @ApiProperty({
    description: 'Filter resources created from date',
    example: '2026-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Date must be a string' })
  createdFrom?: string;

  @ApiProperty({
    description: 'Filter resources created to date',
    example: '2026-08-25T23:59:59Z',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Date must be a string' })
  createdTo?: string;

  @ApiProperty({
    description: 'Sort by field',
    example: 'createdAt',
    enum: [
      'name',
      'createdAt',
      'updatedAt',
      'favoritesCount',
      'downloadsCount',
    ],
    required: false,
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'Sort field must be a string' })
  sortBy?: string = 'createdAt';

  @ApiProperty({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    required: false,
    default: 'DESC',
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'], { message: 'Invalid sort order' })
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number = 10;

  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;
}
