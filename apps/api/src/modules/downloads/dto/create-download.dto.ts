import { IsString } from 'class-validator';

export class CreateDownloadDto {
  @IsString()
  telegramId!: number;

  @IsString()
  resourceSlug!: string;
}
