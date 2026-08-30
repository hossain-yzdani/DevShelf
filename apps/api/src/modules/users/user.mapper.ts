import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/response-user.dto';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    const dto = new UserResponseDto();

    dto.id = user.id;
    if (user.telegramId) dto.telegramId = user.telegramId;
    dto.username = user.username;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.languageCode = user.languageCode;
    dto.isActive = user.isActive;
    dto.isAdmin = user.isAdmin;
    dto.role = user.role;
    dto.notifications = user.notifications;
    dto.theme = user.theme;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    dto.lastActivity = user.lastActivity;

    dto.favoritesCount = user.favorites?.length || 0;
    dto.downloadsCount = user.downloads?.length || 0;
    dto.searchesCount = user.searches?.length || 0;

    dto.favorites = user.favorites?.slice(0, 5).map((fav) => ({
      id: fav.id,
      resourceId: fav.resource?.id,
      createdAt: fav.createdAt,
    }));

    dto.downloads = user.downloads?.slice(0, 5).map((download) => ({
      id: download.id,
      resourceId: download.resource?.id,
      downloadedAt: download.downloadedAt,
    }));

    dto.searches = user.searches?.slice(0, 5).map((search) => ({
      id: search.id,
      query: search.query,
      createdAt: search.searchedAt,
    }));

    return dto;
  }

  static toResponseDtoArray(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toResponseDto(user));
  }
}
