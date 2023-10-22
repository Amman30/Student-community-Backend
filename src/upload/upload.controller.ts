import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import FileDto from './dto';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from './upload.service';

@Controller('file')
export class UploadController {
  constructor(
    private prismaService: PrismaService,
    private uploadService: UploadService,
  ) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter(_, file, callback) {
        if (
          extname(file.originalname) !== '.pdf' ||
          file.mimetype !== 'application/pdf'
        ) {
          return callback(
            new UnsupportedMediaTypeException('only .pdf files are supported'),
            false,
          );
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: UploadService.getBaseDir(),
        filename: (_, file, callback) => {
          const name = randomUUID();
          const extension = extname(file.originalname);
          callback(null, `notes/${name}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Body() dto: FileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /.pdf$/ }),
          new MaxFileSizeValidator({ maxSize: 200000000 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // TODO: Move this logic to department service
    const department = await this.prismaService.department.findFirst({
      where: { department: dto.department, semester: dto.semester },
    });

    if (department) {
      await this.prismaService.department.update({
        where: { id: department.id },
        data: {
          file: {
            create: { name: dto.name, path: file.filename },
          },
        },
      });
    } else {
      await this.prismaService.department.create({
        data: {
          department: dto.department,
          semester: dto.semester,
          file: {
            create: { name: dto.name, path: file.filename },
          },
        },
      });
    }

    return {
      message: `file ${file.originalname} upload successful`,
      file: file.originalname,
      statusCode: 201,
    };
  }
  @Get('upload/:department/:semester')
  async getFiles(@Param() params: any) {
    const fileInfo = await this.prismaService.file.findMany({
      where: {
        Deparment: { department: params.department, semester: params.semester },
      },
    });
    return fileInfo.map((info) => ({
      name: info.name,
      url: UploadService.getUrlForPath(info.path),
    }));
  }
}
