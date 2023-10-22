import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  static getUrlForPath(path: string): string {
    return `${process.env.APP_URL}/${process.env.STATIC_PREFIX}/${path}`;
  }
  static getBaseDir() {
    return join(process.cwd(), process.env.STATIC_DIR || 'static');
  }
  static getPathPrefix() {
    return `/${process.env.STATIC_PREFIX}`;
  }
}
