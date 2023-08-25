import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Express } from 'express';
import MultipartFormDataFileSchema from '../@schemas/file-multipart-form.schema';
import { Salesman } from 'src/@types/salesman.type';
import { TransactionEntity } from 'src/@entities/transaction.entity';

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
  ): Promise<{ success: boolean }> {
    try {
      await this.transactionsService.readFileContent(file);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  @Get()
  async getTransactionsBySalesman(
    @Query('Salesman') salesman: string,
  ): Promise<TransactionEntity[]> {
    return this.transactionsService.getTransactionsBySalesman(salesman);
  }

  @Get('salesman')
  async getSalesman(): Promise<Salesman[]> {
    return this.transactionsService.getSalesman();
  }
}
