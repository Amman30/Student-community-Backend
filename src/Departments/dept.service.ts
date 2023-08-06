import { Injectable } from '@nestjs/common';
import { DepartmentDTO } from './dept.dto';
import * as fs from 'fs';

@Injectable()
export class DepartmentService {
  private readonly dept: DepartmentDTO[];

  constructor() {
    const rawData = fs.readFileSync('src/Departments/DeptNames.json', 'utf-8');
    this.dept = JSON.parse(rawData.toString());
  }

  getDepartmentsNames(): DepartmentDTO[] {
    return this.dept;
  }
}
