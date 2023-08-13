import { Injectable } from '@nestjs/common';
import { SubjectsDTO } from './subject.dto';
import * as fs from 'fs';

@Injectable()
export class SubjectsService {
  private sub: SubjectsDTO[];

  loadSubjects(department: string, semester: number): void {
    const filePath = `src/Subjects/files/${department}Subjects/${semester}.json`;
    const rawData = fs.readFileSync(filePath, 'utf-8');
    this.sub = JSON.parse(rawData.toString());
  }

  getSubjectsNames(): SubjectsDTO[] {
    return this.sub;
  }
}
