import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './Departments/dept.module';
import { SubjectsModule } from './Subjects/subject.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { InternshipsModule } from './internships/internships.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: UploadService.getBaseDir(),
      serveRoot: UploadService.getPathPrefix(),
      serveStaticOptions: {
        extensions: ['pdf'],
      },
    }),
    DepartmentModule,
    SubjectsModule,
    UploadModule,
    AuthModule,
    InternshipsModule,
    PrismaModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
