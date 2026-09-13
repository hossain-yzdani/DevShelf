import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly uploadDir = './uploads';

  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    const dirs = [
      this.uploadDir,
      path.join(this.uploadDir, 'resources'),
      path.join(this.uploadDir, 'resources', 'posters'),
      path.join(this.uploadDir, 'resources', 'files'),
    ];

    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  getUploadPath(type: 'poster' | 'file', extension: string): string {
    const uuid = uuidv4();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const subDir = type === 'poster' ? 'posters' : 'files';
    const folderPath = path.join(
      this.uploadDir,
      'resources',
      subDir,
      String(year),
      month,
    );

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filename = `${uuid}.${extension}`;
    return path.join(folderPath, filename);
  }

  getUrl(filePath: string): string {
    const relativePath = filePath.replace(/\\/g, '/').replace('uploads/', '');
    return `${process.env.URL}/uploads/${relativePath}`;
  }
}
