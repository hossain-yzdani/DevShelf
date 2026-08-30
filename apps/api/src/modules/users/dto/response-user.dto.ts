import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/usersRole.enum';

class FavoriteInfo {
  @ApiProperty({ description: 'Favorite ID' })
  id!: string;

  @ApiProperty({ description: 'Resource ID' })
  resourceId!: string;

  @ApiProperty({ description: 'Created at' })
  createdAt!: Date;
}

class DownloadInfo {
  @ApiProperty({ description: 'Download ID' })
  id!: string;

  @ApiProperty({ description: 'Resource ID' })
  resourceId!: string;

  @ApiProperty({ description: 'Downloaded at' })
  downloadedAt!: Date;
}

class SearchInfo {
  @ApiProperty({ description: 'Search ID' })
  id!: string;

  @ApiProperty({ description: 'Search query' })
  query!: string;

  @ApiProperty({ description: 'Created at' })
  createdAt!: Date;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Telegram ID of the user',
    example: 123456789,
  })
  telegramId!: number;

  @ApiProperty({
    description: 'Telegram username',
    example: 'john_doe',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'Language code of the user',
    example: 'en',
    default: 'fa',
  })
  languageCode?: string;

  @ApiProperty({
    description: 'User active status',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Admin status of the user',
    example: false,
  })
  isAdmin!: boolean;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.USER,
  })
  role!: string;

  @ApiProperty({
    description: 'Notification preferences',
    example: true,
  })
  notifications!: boolean;

  @ApiProperty({
    description: 'Theme preference',
    example: 'dark',
  })
  theme!: string;

  @ApiProperty({
    description: 'Number of favorites',
    example: 42,
  })
  favoritesCount!: number;

  @ApiProperty({
    description: 'Number of downloads',
    example: 15,
  })
  downloadsCount!: number;

  @ApiProperty({
    description: 'Number of searches',
    example: 120,
  })
  searchesCount!: number;

  @ApiProperty({
    description: 'Recent favorites',
    type: [FavoriteInfo],
    required: false,
  })
  favorites?: FavoriteInfo[];

  @ApiProperty({
    description: 'Recent downloads',
    type: [DownloadInfo],
    required: false,
  })
  downloads?: DownloadInfo[];

  @ApiProperty({
    description: 'Recent searches',
    type: [SearchInfo],
    required: false,
  })
  searches?: SearchInfo[];

  @ApiProperty({
    description: 'Creation date',
    example: '2026-01-15T10:30:00Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2026-08-25T14:20:00Z',
  })
  updatedAt!: Date;

  @ApiProperty({
    description: 'Last activity timestamp',
    example: '2026-08-25T14:30:00Z',
    required: false,
  })
  lastActivity?: Date;
}
