import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import FileDto from './dto';

@Controller('file')
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter(_, file, callback) {
        if (!file.originalname.match(/\.pdf$/)) {
          return callback(
            new UnsupportedMediaTypeException('only .pdf files are supported'),
            false,
          );
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: (req, _, cb?) => {
          try {
            const destinationPath = `notes`;
            cb(null, destinationPath);
          } catch (error) {
            cb(error, '');
          }
        },
        filename: (_, file, cb) => {
          try {
            const fileNameSplit = file.originalname.split('.');
            cb(null, `${fileNameSplit[0]}.${fileNameSplit[1]}`);
          } catch (error) {
            cb(error, '');
          }
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
    return {
      message: `file ${file.originalname} upload successful`,
      file: file.originalname,
      statusCode: 201,
    };
  }
}
