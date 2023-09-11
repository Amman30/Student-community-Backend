import { Module } from '@nestjs/common';
import { InternshipsController } from './internships.controller';
import { InternshipService } from './internship.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [InternshipService, PrismaService],
  controllers: [InternshipsController],
})
export class InternshipsModule {}
