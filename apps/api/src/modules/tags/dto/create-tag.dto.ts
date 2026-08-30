import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Unique slug of the tag (URL-friendly)',
    example: 'nestjs',
    required: true,
  })
  @IsNotEmpty({ message: 'Slug is required' })
  @IsString({ message: 'Slug must be a string' })
  slug!: string;

  @ApiProperty({
    description: 'Unique name of the tag',
    example: 'NestJS',
    required: true,
  })
  @IsNotEmpty({ message: 'Tag name is required' })
  @IsString({ message: 'Tag name must be a string' })
  name!: string;

  @ApiProperty({
    description: 'Description of the tag',
    example: 'NestJS framework for building efficient Node.js applications',
    required: true,
  })
  @IsNotEmpty({ message: 'Tag description is required' })
  @IsString({ message: 'Tag description must be a string' })
  description!: string;
}
