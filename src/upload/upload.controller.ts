import {
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
import * as fs from 'fs';

@Controller()
export class UploadController {
  @Post('upload/:department')
  @UseInterceptors(
    FileInterceptor('file', {
      // handling file upload execption
      fileFilter(_, file, callback) {
        if (!file.originalname.match(/\.pdf$/)) {
          return callback(
            new UnsupportedMediaTypeException('only .pdf files are supported'),
            false,
          );
        }
        // accepts the uploaded file
        callback(null, true);
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const department = req.params.department;
          const destinationPath = `uploadedFiles/${department}`;
          cb(null, destinationPath);
          try {
            fs.promises.mkdir(destinationPath, { recursive: true });
            cb(null, destinationPath);
          } catch (error) {
            cb(error, null);
          }
        },
        filename: (_, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          cb(null, `${fileNameSplit[0]}.${fileNameSplit[1]}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /.pdf$/ }),
          // max size shouldn't exceed 50Mbs
          new MaxFileSizeValidator({ maxSize: 50000000 }),
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
