import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Unique slug of the tag (URL-friendly)',
    example: 'nestjs-framework',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Slug must be a string' })
  slug?: string;

  @ApiProperty({
    description: 'Unique name of the tag',
    example: 'NestJS Framework',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tag name must be a string' })
  name?: string;

  @ApiProperty({
    description: 'Description of the tag',
    example:
      'NestJS framework for building efficient and scalable Node.js applications',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tag description must be a string' })
  description?: string;
}
