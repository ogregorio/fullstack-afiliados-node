import { Module } from '@nestjs/common';
import { TransactionsModule } from './@core/transactions/transactions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/@configs/database-config';
import applicationConfig from 'src/@configs/application-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/@entities/transaction.entity';
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';
import { SeedService } from 'src/@bootstrap/seed.service';
import { AuthModule } from 'src/@core/auth/auth.module';

@Module({
  imports: [
    TransactionsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, applicationConfig],
    }),
    TypeOrmModule.forFeature([TransactionTypeEntity, TransactionEntity]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [TransactionTypeEntity, TransactionEntity],
        synchronize: true,
      }),
    }),
  ],
  providers: [SeedService],
})
export class AppModule {}
