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

@Controller('file')
export class UploadController {
  // POST file/upload
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter(_, file, callback) {
        if (!file.originalname.match(/.pdf$/)) {
          return callback(
            new UnsupportedMediaTypeException('only .pdf files are supported'),
            false,
          );
        }

        callback(null, true);
      },
      storage: diskStorage({
        destination: 'notes',
        filename: (_, filename, cb) => {
          const fileNameSplit = filename.originalname.split('.');
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
      message: 'file upload successful',
      file: file.originalname,
      statusCode: 201,
    };
  }
}
