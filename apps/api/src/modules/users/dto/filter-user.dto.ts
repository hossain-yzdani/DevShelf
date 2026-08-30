import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'src/common/enums/usersRole.enum';

export class UserFilterDto {
  @ApiProperty({
    description: 'Search by username, first name, or last name',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Search text must be a string' })
  search?: string;

  @ApiProperty({
    description: 'Filter by Telegram ID',
    example: 123456789,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Telegram ID must be a number' })
  @Min(1, { message: 'Telegram ID must be positive' })
  telegramId?: number;

  @ApiProperty({
    description: 'Filter by user role',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role?: string;

  @ApiProperty({
    description: 'Filter by active status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;

  @ApiProperty({
    description: 'Filter by admin status',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isAdmin must be a boolean' })
  isAdmin?: boolean;

  @ApiProperty({
    description: 'Filter by notification preference',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'notifications must be a boolean' })
  notifications?: boolean;

  @ApiProperty({
    description: 'Filter by theme',
    example: 'dark',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Theme must be a string' })
  theme?: string;

  @ApiProperty({
    description: 'Filter users created from date',
    example: '2026-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  createdFrom?: string;

  @ApiProperty({
    description: 'Filter users created to date',
    example: '2026-08-25T23:59:59Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  createdTo?: string;

  @ApiProperty({
    description: 'Filter users with minimum favorites count',
    example: 5,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Count must be a number' })
  @Min(0, { message: 'Count cannot be negative' })
  minFavorites?: number;

  @ApiProperty({
    description: 'Filter users with minimum downloads count',
    example: 3,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Count must be a number' })
  @Min(0, { message: 'Count cannot be negative' })
  minDownloads?: number;

  @ApiProperty({
    description: 'Sort by field',
    example: 'createdAt',
    enum: [
      'telegramId',
      'username',
      'firstName',
      'lastName',
      'createdAt',
      'updatedAt',
      'lastActivity',
      'favoritesCount',
      'downloadsCount',
      'searchesCount',
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
  @IsNumber({}, { message: 'Limit must be a number' })
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
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;
}
