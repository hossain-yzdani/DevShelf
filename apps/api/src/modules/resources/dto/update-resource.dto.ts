import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsArray } from 'class-validator';
import { ResourceType } from 'src/common/enums/resourcesType.enum';

export class UpdateResourceDto {
  @ApiProperty({
    description: 'Unique name of the resource',
    example: 'Advanced Node.js Programming - v2',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty({
    description: 'Full description of the resource',
    example:
      'This resource covers advanced Node.js topics including Cluster, Worker Threads, etc.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Type of the resource',
    enum: ResourceType,
    example: ResourceType.BOOK,
    required: false,
  })
  @IsOptional()
  @IsEnum(ResourceType, { message: 'Invalid resource type' })
  type?: ResourceType;

  @ApiProperty({
    description: 'File URL of the resource',
    example: 'https://storage.example.com/files/book-123-updated.pdf',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'File URL must be a string' })
  fileUrl?: string;

  @ApiProperty({
    description: 'Poster/image URL of the resource',
    example: 'https://storage.example.com/posters/book-123-updated.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Poster URL must be a string' })
  posterUrl?: string;

  @ApiProperty({
    description: 'Author name',
    example: 'John Doe - Updated',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Author name must be a string' })
  author?: string;

  @ApiProperty({
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid category ID format' })
  category?: string;

  @ApiProperty({
    description: 'List of tag IDs',
    example: ['tag-uuid-1', 'tag-uuid-2'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  @IsUUID('4', { each: true, message: 'Invalid tag ID format' })
  tags?: string[];
}
