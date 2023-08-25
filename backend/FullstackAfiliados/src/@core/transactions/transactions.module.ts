import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';
import { TransactionEntity } from 'src/@entities/transaction.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([TransactionEntity, TransactionTypeEntity]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
