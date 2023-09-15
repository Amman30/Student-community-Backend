import { Module } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({ imports: [PrismaModule], controllers: [UploadController] })
export class UploadModule {}
