import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
// import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { FavoritesController } from './favorites.controller';
import { ResourcesModule } from '../resources/resources.module';

@Module({
  imports: [
    UsersModule,
    ResourcesModule,
    UsersModule, TypeOrmModule.forFeature([Favorite])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
