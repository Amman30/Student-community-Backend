import { Controller, Get, Param } from '@nestjs/common';
import { SubjectsService } from './subject.service';

@Controller(':department/:semester')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  getSubjectsNames(
    @Param('department') department: string,
    @Param('semester') semester: number,
  ) {
    this.subjectsService.loadSubjects(department, semester);
    return this.subjectsService.getSubjectsNames();
  }
}
