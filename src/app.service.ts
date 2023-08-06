import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreetings(): string {
    return 'Welcome To the back-end of Studnets Community App';
  }
}
