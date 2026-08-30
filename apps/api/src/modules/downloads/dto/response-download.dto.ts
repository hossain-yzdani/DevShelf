import { ApiProperty } from '@nestjs/swagger';

class DownloadUserDto {
  @ApiProperty({ example: '23e497eb-8000-4f6f-9c45-892d75e9d0b8' })
  id!: string;

  @ApiProperty({ example: 'admin' })
  username!: string;

  @ApiProperty({ example: 'hossain5' })
  firstName!: string;

  @ApiProperty({ example: 'yazdani' })
  lastName!: string;
}

class DownloadResourceDto {
  @ApiProperty({ example: 'b6f4b90e-d701-402b-8cdd-d41153b4f26e' })
  id!: string;

  @ApiProperty({ example: 'Mastering NestJS Framework' })
  name!: string;

  @ApiProperty({ example: 'mastering-nesjs-framework' })
  slug!: string;

  @ApiProperty({ example: 'book' })
  type!: string;

  @ApiProperty({ example: 'https://hossainyazdani.ir/assets/test.pdf' })
  fileUrl!: string;

  @ApiProperty({ example: 'https://picsum.photos/seed/nestjs/400/600' })
  posterUrl!: string;

  @ApiProperty({ example: 'Hossain Yazdnai' })
  author!: string;
}

export class DownloadResponseDto {
  @ApiProperty({ example: 'c99538a0-c659-4c14-b87c-686a70922578' })
  id!: string;

  @ApiProperty({ type: DownloadUserDto })
  user!: DownloadUserDto;

  @ApiProperty({ type: DownloadResourceDto })
  resource!: DownloadResourceDto;

  @ApiProperty({ example: '2026-08-29T07:20:54.810Z' })
  downloadedAt!: Date;
}
