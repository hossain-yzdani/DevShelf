import { FavoriteResponseDto } from "./dto/response-favorite.dto";
import { Favorite } from "./entities/favorite.entity";

export class FavoriteMapper {
  static toResponseDto(favorite: Favorite): FavoriteResponseDto {
    return {
      id: favorite.id,
      user: {
        id: favorite.user.id,
        username: favorite.user.username!,
        firstName: favorite.user.firstName!,
        lastName: favorite.user.lastName!,
      },
      resource: {
        id: favorite.resource.id,
        name: favorite.resource.name,
        slug: favorite.resource.slug,
        type: favorite.resource.type,
        fileUrl: favorite.resource.fileUrl,
        posterUrl: favorite.resource.posterUrl,
        author: favorite.resource.author,
      },
      createdAt: favorite.createdAt,
    };
  }

  static toResponseDtoArray(downloads: Favorite[]): FavoriteResponseDto[] {
    return downloads.map((favorite) => this.toResponseDto(favorite));
  }
}
