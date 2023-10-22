import { Controller, Get } from '@nestjs/common';
import { UploadService } from './upload/upload.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getGreetings() {
    const files = await this.prismaService.file.findMany();

    return files.map((file) => UploadService.getUrlForPath(file.path));
  }
}
