import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ResourcesService } from '../resources/resources.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteMapper } from './favorite.mapper';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    private usersService: UsersService,
    private resourcesService: ResourcesService,
  ) {}

  async getAll() {
    try {
      const favorites = await this.favoritesRepository.find({
        relations: {
          user: true,
          resource: true,
        },
      });
      return FavoriteMapper.toResponseDtoArray(favorites);
    } catch (error) {
      throw new InternalServerErrorException('Get favorites failed');
    }
  }

  async getStats() {
    const total = await this.favoritesRepository.count();
    return { total };
  }

  async getResource(slug: string) {
    const resource = await this.resourcesService.findOne(slug);
    if (!resource) {
      throw new NotFoundException('Resource was not found');
    }
    return {
      resource: resource.name,
      total: resource.favoritesCount,
    };
  }

  async addFavorite(createFavoriteDto: CreateFavoriteDto) {
    try {
      const { resourceSlug, username } = createFavoriteDto;
      const resource = await this.resourcesService.findOne(resourceSlug);
      const user = await this.usersService.findOne(username);

      const existing = await this.favoritesRepository.findOne({
        where: {
          user: { id: user.id },
          resource: { id: resource.id },
        },
      });

      if (existing) {
        throw new ConflictException('Already favorited');
      }

      const favorite = this.favoritesRepository.create({
        user,
        resource,
      });
      return await this.favoritesRepository.save(favorite);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Add favorite failed');
    }
  }

  async removeFavorite(favoriteId: string) {
    try {
      const favorite = await this.favoritesRepository.findOne({
        where: { id: favoriteId },
      });
      if (!favorite) {
        throw new NotFoundException('Favorite was not found');
      }
      return await this.favoritesRepository.remove(favorite);
    } catch (error) {
      throw new InternalServerErrorException('Remove favorite failed');
    }
  }

  async getMyFavorites(username: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user;
  }

  async isFavorited(telegramId: number, slug: string): Promise<boolean> {
    try {
      const user = await this.usersService.findOneByTelegramId(telegramId);
      if (!user) {
        return false;
      }

      const resource = await this.resourcesService.findOne(slug);
      if (!resource) {
        return false;
      }

      const favorite = await this.favoritesRepository.findOne({
        where: {
          user: { id: user.id },
          resource: { id: resource.id },
        },
      });

      return !!favorite;
    } catch (error) {
      return false;
    }
  }

  async toggleFavorite(
    telegramId: number,
    slug: string,
  ): Promise<{ isFavorited: boolean }> {
    try {
      const user = await this.usersService.findOneByTelegramId(telegramId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const resource = await this.resourcesService.findOne(slug);
      if (!resource) {
        throw new NotFoundException('Resource not found');
      }

      const existing = await this.favoritesRepository.findOne({
        where: {
          user: { id: user.id },
          resource: { id: resource.id },
        },
      });

      if (existing) {
        await this.favoritesRepository.remove(existing);
        return { isFavorited: false };
      } else {
        const favorite = this.favoritesRepository.create({
          user,
          resource,
        });
        await this.favoritesRepository.save(favorite);
        return { isFavorited: true };
      }
    } catch (error) {
      throw new InternalServerErrorException('Toggle favorite failed');
    }
  }

  async getUserFavorites(username: string) {
    try {
      const user = await this.usersService.findOne(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const favorites = await this.favoritesRepository.find({
        where: {
          user: { id: user.id },
        },
        relations: {
          resource: {
            category: true,
            tags: true,
          },
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return favorites.map((fav) => ({
        id: fav.id,
        resource: fav.resource,
        createdAt: fav.createdAt,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Get user favorites failed');
    }
  }

  async removeFavoriteBySlug(username: string, slug: string): Promise<void> {
    try {
      const user = await this.usersService.findOne(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const resource = await this.resourcesService.findOne(slug);
      if (!resource) {
        throw new NotFoundException('Resource not found');
      }

      const favorite = await this.favoritesRepository.findOne({
        where: {
          user: { id: user.id },
          resource: { id: resource.id },
        },
      });

      if (!favorite) {
        throw new NotFoundException('Favorite not found');
      }

      await this.favoritesRepository.remove(favorite);
    } catch (error) {
      throw new InternalServerErrorException('Remove favorite failed');
    }
  }
}
