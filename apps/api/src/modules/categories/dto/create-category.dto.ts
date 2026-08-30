import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Slug of the category (unique)',
    example: 'programming',
    required: true,
  })
  @IsNotEmpty({ message: 'Category slug is required' })
  @IsString({ message: 'Category slug must be a string' })
  slug!: string;

  @ApiProperty({
    description: 'Name of the category (unique)',
    example: 'Programming',
    required: true,
  })
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  name!: string;

  @ApiProperty({
    description: 'Description of the category (unique)',
    example: 'All programming languages and frameworks',
    required: true,
  })
  @IsNotEmpty({ message: 'Category description is required' })
  @IsString({ message: 'Category description must be a string' })
  description!: string;
}
