import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class Dto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  SkillRequired: string;

  @IsNumber()
  stipend: number;
}
