import { IsString, IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class Dto {
  @IsString()
  role: string;

  @IsString()
  description: string;

  @IsString()
  SkillRequired: string;

  @IsString()
  stipend: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;
}
