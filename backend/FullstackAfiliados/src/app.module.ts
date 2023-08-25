import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/@configs/database-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/@entities/transaction.entity';
import { TransactionType } from 'src/@entities/transaction-type.entity';
import { SeedService } from 'src/@bootstrap/seed.service';

@Module({
  imports: [
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forFeature([TransactionType, Transaction]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [Transaction, TransactionType],
        synchronize: true,
      }),
    }),
  ],
  providers: [SeedService],
})
export class AppModule {}
