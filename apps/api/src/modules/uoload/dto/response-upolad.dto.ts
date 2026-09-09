import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UploadResponseDto {
  @ApiProperty()
  @IsBoolean()
  success!: boolean;

  @ApiProperty()
  @IsString()
  url!: string;

  @ApiProperty()
  @IsString()
  message!: string;
}