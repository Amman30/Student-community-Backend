import { Controller, Post, Body } from '@nestjs/common';
import { InternshipService } from './internship.service';
import { Dto } from './internship.dto';

interface Success {
  message: string;
  code: number;
}

@Controller('internships')
export class InternshipsController {
  constructor(private readonly intenService: InternshipService) {}

  @Post('create')
  async create(@Body() Dtoo: Dto) {
    await this.intenService.createNewInternship(Dtoo);
  }
}
