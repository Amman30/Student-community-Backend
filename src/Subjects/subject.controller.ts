import { Controller, Get, Param } from '@nestjs/common';
import { SubjectsService } from './subject.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get(':department/:semester')
  getSubjectsNames(
    @Param('department') department: string,
    @Param('semester') semester: number,
  ) {
    this.subjectsService.loadSubjects(department, semester);
    return this.subjectsService.getSubjectsNames();
  }
}
