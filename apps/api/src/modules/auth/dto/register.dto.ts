import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Telegram ID of the user',
    example: 123456789,
    required: true,
  })
  @IsNotEmpty({ message: 'Telegram ID is required' })
  @IsNumber({}, { message: 'Telegram ID must be a number' })
  @Min(1, { message: 'Telegram ID must be a positive number' })
  @Type(() => Number)
  telegramId!: number;

  @ApiProperty({
    description: 'Telegram username',
    example: 'john_doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  @MaxLength(30, { message: 'Username must not exceed 30 characters' })
  username?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName?: string;

  @ApiProperty({
    description: 'Language code of the user',
    example: 'en',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Language code must be a string' })
  @MaxLength(2, { message: 'Language code must be 2 characters' })
  languageCode?: string;
}
