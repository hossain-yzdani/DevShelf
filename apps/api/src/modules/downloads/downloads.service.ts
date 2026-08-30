import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Download } from './entities/download.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ResourcesService } from '../resources/resources.service';
import { CreateDownloadDto } from './dto/create-download.dto';
import { DownloadMapper } from './download.mapper';

@Injectable()
export class DownloadsService {
  constructor(
    @InjectRepository(Download)
    private downloadsRepository: Repository<Download>,
    private usersService: UsersService,
    private resourcesService: ResourcesService,
  ) {}

  async findAll() {
    try {
      const downloads = await this.downloadsRepository.find({
        relations: {
          resource: true,
          user: true,
        },
      });
      return DownloadMapper.toResponseDtoArray(downloads);
    } catch {
      throw new InternalServerErrorException('Get downloads faild');
    }
  }

  async getStats() {
    const total = await this.downloadsRepository.count();
    return {
      total,
    };
  }

  async getResource(slug: string) {
    const resource = await this.resourcesService.findOne(slug);
    if (!resource) {
      throw new NotFoundException('Resource was not found');
    }
    return {
      resource: resource.name,
      tolal: resource.downloadsCount,
    };
  }

  async download(createDownloadDto: CreateDownloadDto) {
    try {
      const { resourceSlug, username } = createDownloadDto;
      const resource = await this.resourcesService.findOne(resourceSlug);
      const user = await this.usersService.findOne(username);

      const dowonload = this.downloadsRepository.create({
        resource,
        user,
      });

      return await this.downloadsRepository.save(dowonload);
    } catch (error) {
      throw new InternalServerErrorException('Download Faild');
    }
  }

  async getMyDownloads(username: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user.downloads;
  }
}
