import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ResourceType } from 'src/common/enums/resourcesType.enum';

export class CreateResourceDto {
  @ApiProperty({
    description: 'Unique name of the resource',
    example: 'Advanced Node.js Programming',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @ApiProperty({
    description: 'Unique name of the resource',
    example: 'Advanced Node.js Programming',
    required: true,
  })
  @IsNotEmpty({ message: 'Slug is required' })
  @IsString({ message: 'Slug must be a string' })
  slug!: string;

  @ApiProperty({
    description: 'Full description of the resource',
    example:
      'This resource covers advanced Node.js topics including Cluster, Worker Threads, etc.',
    required: true,
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description!: string;

  @ApiProperty({
    description: 'Type of the resource',
    enum: ResourceType,
    example: ResourceType.BOOK,
    default: ResourceType.BOOK,
    required: false,
  })
  @IsOptional()
  @IsEnum(ResourceType, { message: 'Invalid resource type' })
  type?: ResourceType;

  @ApiProperty({
    description: 'File URL of the resource',
    example: 'https://storage.example.com/files/book-123.pdf',
    required: true,
  })
  @IsNotEmpty({ message: 'File URL is required' })
  @IsString({ message: 'File URL must be a string' })
  fileUrl!: string;

  @ApiProperty({
    description: 'Poster/image URL of the resource',
    example: 'https://storage.example.com/posters/book-123.jpg',
    required: true,
  })
  @IsNotEmpty({ message: 'Poster URL is required' })
  @IsString({ message: 'Poster URL must be a string' })
  posterUrl!: string;

  @ApiProperty({
    description: 'Author name',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty({ message: 'Author name is required' })
  @IsString({ message: 'Author name must be a string' })
  author!: string;

  @ApiProperty({
    description: 'Category ID (category must exist)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsUUID('4', { message: 'Invalid category ID format' })
  category!: string;

  @ApiProperty({
    description: 'List of tag IDs (tags must exist)',
    example: ['tag-uuid-1', 'tag-uuid-2', 'tag-uuid-3'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @IsUUID('4', { each: true, message: 'Invalid tag ID format' })
  tags?: string[];
}
