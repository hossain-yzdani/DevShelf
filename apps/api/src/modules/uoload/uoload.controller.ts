import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './upload.service';
import * as multer from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '../auth/guards/auth.guard';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/temp';
    if (!require('fs').existsSync(uploadPath)) {
      require('fs').mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = uuidv4();
    cb(null, `${name}${ext}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/mp3',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(
        `فرمت فایل ${file.mimetype} پشتیبانی نمی‌شود. فرمت‌های مجاز: ${allowedTypes.join(', ')}`,
      ),
      false,
    );
  }
};

@UseGuards(AuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('poster')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter,
      limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
      },
    }),
  )
  async uploadPoster(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    if (!file) {
      throw new BadRequestException('فایلی انتخاب نشده است');
    }

    const ext = path.extname(file.originalname).slice(1);
    const destPath = this.uploadsService.getUploadPath('poster', ext);

    const fs = require('fs');
    fs.renameSync(file.path, destPath);

    const url = this.uploadsService.getUrl(destPath);
    return {
      success: true,
      url,
      message: 'پوستر با موفقیت آپلود شد',
    };
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter,
      limits: {
        fileSize: 256 * 1024 * 1024, // 256MB
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    if (!file) {
      throw new BadRequestException('فایلی انتخاب نشده است');
    }

    const ext = path.extname(file.originalname).slice(1);
    const destPath = this.uploadsService.getUploadPath('file', ext);

    const fs = require('fs');
    fs.renameSync(file.path, destPath);

    const url = this.uploadsService.getUrl(destPath);
    return {
      success: true,
      url,
      message: 'فایل با موفقیت آپلود شد',
    };
  }
}
