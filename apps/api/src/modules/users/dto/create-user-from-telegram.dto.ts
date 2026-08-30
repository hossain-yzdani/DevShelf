import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateTelegramUserDto {
  @ApiProperty({
    description: 'Telegram ID of the user (unique)',
    example: 123456789,
    required: true,
  })
  @IsNotEmpty({ message: 'Telegram ID is required' })
  @IsNumber({}, { message: 'Telegram ID must be a number' })
  @Min(1, { message: 'Telegram ID must be positive' })
  telegramId!: number;

  @ApiProperty({
    description: 'Telegram username',
    example: 'john_doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @ApiProperty({
    description: 'Password',
    example: 'admin12345',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @ApiProperty({
    description: 'Language code of the user',
    example: 'en',
    default: 'fa',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Language code must be a string' })
  languageCode?: string;
}
