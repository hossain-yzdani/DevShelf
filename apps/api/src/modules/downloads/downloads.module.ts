import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Download } from './entities/download.entity';
import { DownloadsController } from './downloads.controller';
import { UsersModule } from '../users/users.module';
import { ResourcesModule } from '../resources/resources.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    ResourcesModule,
    TypeOrmModule.forFeature([Download])],
  providers: [DownloadsService],
  controllers: [DownloadsController],
})
export class DownloadsModule {}

