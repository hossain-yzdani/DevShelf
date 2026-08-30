import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesController } from './searches.controller';
import { Search } from './entities/search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Search])],
  controllers: [SearchesController],
  providers: [SearchesService],
})
export class SearchesModule {}
