import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import parseSalesFile from 'src/@helpers/file-parser';
import streamToString from 'src/@helpers/stream-reader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from 'src/@entities/transaction.entity'; // Importe a entidade correta
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';
import { Salesman } from 'src/@types/salesman.type';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(TransactionTypeEntity)
    private readonly transactionTypeRepository: Repository<TransactionTypeEntity>,
  ) {}

  async readFileContent(file: Express.Multer.File): Promise<void> {
    try {
      const stream = createReadStream(join(process.cwd(), file.path));
      const content = await streamToString(stream);
      const parsedTransactions = parseSalesFile(content);

      for (const parsedTransaction of parsedTransactions) {
        const { relativeType, date, product, amount, salesman } =
          parsedTransaction;

        const transaction = new TransactionEntity();
        transaction.type = await this.transactionTypeRepository.findOne({
          where: { type: relativeType },
        });
        transaction.date = date;
        transaction.product = product;
        transaction.amount = amount;
        transaction.salesman = salesman;

        await this.transactionRepository.save(transaction);
      }
    } catch (error) {
      console.error('Error reading or parsing file:', error);
      throw error;
    }
  }

  async getTransactionsBySalesman(
    salesman: string,
  ): Promise<TransactionEntity[]> {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.salesman = :salesman', { salesman })
      .leftJoinAndSelect('transaction.type', 'transactionType')
      .getMany();

    return (await query).map((result: any) => ({
      ...result,
      amount: parseFloat(result.amount),
      date: new Date(result.date).toISOString().slice(0, -5) + 'Z',
    }));
  }

  async getSalesman(): Promise<Salesman[]> {
    const query = this.transactionRepository
      .createQueryBuilder('transaction')
      .groupBy('transaction.salesman')
      .select('transaction.salesman', 'name')
      .addSelect(
        'SUM(CASE WHEN transactionType.signal THEN transaction.amount ELSE -transaction.amount END)',
        'totalAmount',
      )
      .leftJoin('transaction.type', 'transactionType')
      .getRawMany();

    return (await query).map((result: any) => ({
      name: result.name,
      totalAmount: parseFloat(result.totalAmount),
    }));
  }
}
