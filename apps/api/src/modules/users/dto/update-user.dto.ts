import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { UserRole } from 'src/common/enums/usersRole.enum';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Telegram username',
    example: 'john_doe_updated',
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
    example: 'Johnathan',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe-Smith',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @ApiProperty({
    description: 'Language code of the user',
    example: 'en',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Language code must be a string' })
  languageCode?: string;

  @ApiProperty({
    description: 'User active status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;

  @ApiProperty({
    description: 'Admin status of the user',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isAdmin must be a boolean' })
  isAdmin?: boolean;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.ADMIN,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role?: string;

  @ApiProperty({
    description: 'Notification preferences',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'notifications must be a boolean' })
  notifications?: boolean;

  @ApiProperty({
    description: 'Theme preference',
    example: 'light',
    default: 'dark',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Theme must be a string' })
  theme?: string;

  @ApiProperty({
    description: 'Last activity timestamp',
    example: '2026-08-25T14:30:00Z',
    required: false,
  })
  @IsOptional()
  lastActivity?: Date;
}
