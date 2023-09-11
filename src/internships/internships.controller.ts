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

  @Post()
  async create(@Body() Dtoo: Dto): Promise<object | null> {
    await this.intenService.createNewInternship(Dtoo);
    const response: Success = {
      message: 'Details Added Successfully',
      code: 201,
    };
    return response;
  }
}
