import { Module } from '@nestjs/common';
import { UploadsController } from './uoload.controller';
import { UploadsService } from './upload.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
