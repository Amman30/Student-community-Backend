import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from './dept.service';
import { DepartmentDTO } from './dept.dto';

@Controller('deptnames')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getDepartmentsNames(): DepartmentDTO[] {
    return this.departmentService.getDepartmentsNames();
  }
}
