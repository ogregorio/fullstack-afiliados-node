import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TransactionsService } from 'src/@core/transactions/transactions.service';
import { Express } from 'express';
import MultipartFormDataFileSchema from 'src/@schemas/file-multipart-form.schema';
import { Salesman } from 'src/@types/salesman.type';
import { TransactionEntity } from 'src/@entities/transaction.entity';
import { SalesmanSchema } from 'src/@schemas/get-salesman.schema';
import { TransactionSchema } from 'src/@schemas/get-transactions-by-salesman.schema';
import { JwtAuthGuard } from 'src/@auth/jwt-auth-guard';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody(MultipartFormDataFileSchema)
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'File upload failed' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ success: boolean }> {
    try {
      await this.transactionsService.readFileContent(file);
      return { success: true };
    } catch (e) {
      throw new BadRequestException({ success: false });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve transactions by salesman' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved transactions by salesman',
    schema: TransactionSchema,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getTransactionsBySalesman(
    @Query('Salesman') salesman: string,
  ): Promise<TransactionEntity[]> {
    return this.transactionsService.getTransactionsBySalesman(salesman);
  }

  @Get('salesman')
  @ApiOperation({ summary: 'Retrieve salesmen data' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved salesmen data',
    schema: SalesmanSchema,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getSalesman(): Promise<Salesman[]> {
    return this.transactionsService.getSalesman();
  }
}
