import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Dto } from './internship.dto';
import { Http2ServerResponse } from 'http2';

@Injectable()
export class InternshipService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewInternship(newDto: Dto) {
    try {
      const findExistingIntership = await this.prisma.internship.findFirst({
        where: {
          role: newDto.role,
          phoneNumber: newDto.phoneNumber,
          email: newDto.email,
        },
      });
      if (findExistingIntership) {
        throw new ConflictException(
          'Internship with these details already exists',
        );
      }
      const newInternship = await this.prisma.internship.create({
        data: {
          role: newDto.role,
          description: newDto.description,
          SkillRequired: newDto.SkillRequired,
          stipend: newDto.stipend,
          phoneNumber: newDto.phoneNumber,
          email: newDto.email,
        },
      });

      return {
        message: 'internship created successfully',
        data: newInternship,
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
