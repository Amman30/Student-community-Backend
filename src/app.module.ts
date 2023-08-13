import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './Departments/dept.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { SubjectsModule } from './Subjects/subject.module';

@Module({
  imports: [DepartmentModule, UploadModule, SubjectsModule],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
