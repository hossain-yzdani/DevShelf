import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Download } from '../downloads/entities/download.entity';
import { Search } from '../searches/entities/search.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { User } from '../users/entities/user.entity';
import { Resource } from '../resources/entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Download, Search, Favorite, User])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
