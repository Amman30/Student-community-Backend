import { Module } from '@nestjs/common';
import { DepartmentController } from './dept.controller';
import { DepartmentService } from './dept.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
