import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import parseSalesFile from 'src/@helpers/file-parser';
import streamToString from 'src/@helpers/stream-reader';
import { Transaction } from 'src/@types/transaction.type';

@Injectable()
export class TransactionsService {
  async readFileContent(file: Express.Multer.File): Promise<Transaction[]> {
    try {
      const stream = createReadStream(join(process.cwd(), file.path));
      const content = await streamToString(stream);
      const parsedTransactions = parseSalesFile(content);

      return parsedTransactions;
    } catch (error) {
      console.error('Error reading or parsing file:', error);
      throw error;
    }
  }
}
