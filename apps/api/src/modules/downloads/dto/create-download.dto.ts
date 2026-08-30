import { IsString } from 'class-validator';

export class CreateDownloadDto {
  @IsString()
  username!: string;

  @IsString()
  resourceSlug!: string;
}
