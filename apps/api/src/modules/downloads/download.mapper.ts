import { Download } from './entities/download.entity';
import { DownloadResponseDto } from './dto/response-download.dto';

export class DownloadMapper {
  static toResponseDto(download: Download): DownloadResponseDto {
    return {
      id: download.id,
      user: {
        id: download.user.id,
        username: download.user.username!,
        firstName: download.user.firstName!,
        lastName: download.user.lastName!,
      },
      resource: {
        id: download.resource.id,
        name: download.resource.name,
        slug: download.resource.slug,
        type: download.resource.type,
        fileUrl: download.resource.fileUrl,
        posterUrl: download.resource.posterUrl,
        author: download.resource.author,
      },
      downloadedAt: download.downloadedAt,
    };
  }

  static toResponseDtoArray(downloads: Download[]): DownloadResponseDto[] {
    return downloads.map((download) => this.toResponseDto(download));
  }
}
