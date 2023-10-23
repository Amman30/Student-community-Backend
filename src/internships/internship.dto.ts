import { IsString, IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class Dto {
  @IsString()
  role: string;

  @IsString()
  description: string;

  @IsString()
  SkillRequired: string;

  @IsNumber()
  stipend: number;

  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: number;
}
