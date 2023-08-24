import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Express } from 'express';
import MultipartFormDataFileSchema from '../@schemas/file-multipart-form.schema';
import { Transaction } from 'src/@types/transaction.type';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody(MultipartFormDataFileSchema)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Transaction[]> {
    const content = await this.transactionsService.readFileContent(file);
    return content;
  }
}
