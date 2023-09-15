import { IsNotEmpty, IsString } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  semester: string;
}
