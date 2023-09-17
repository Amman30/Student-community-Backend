import { Module } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadService } from './upload.service';

@Module({
  imports: [PrismaModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
