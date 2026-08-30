import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Slug of the category (unique)',
    example: 'Advanced Programming',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Category slug must be a string' })
  slug?: string;

  @ApiProperty({
    description: 'Name of the category (unique)',
    example: 'Advanced Programming',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Category name must be a string' })
  name?: string;

  @ApiProperty({
    description: 'Description of the category (unique)',
    example: 'Advanced programming concepts and techniques',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Category description must be a string' })
  description?: string;
}
