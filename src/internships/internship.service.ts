import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Dto } from './internship.dto';

@Injectable()
export class InternshipService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewInternship(newDto: Dto) {
    return this.prisma.internship.create({ data: newDto });
  }
}
