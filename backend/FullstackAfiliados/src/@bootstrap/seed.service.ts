import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(TransactionTypeEntity)
    private transactionTypeRepository: Repository<TransactionTypeEntity>,
  ) {}

  async onModuleInit() {
    await this.seedTransactionTypes();
  }

  async seedTransactionTypes() {
    const typesToSeed = [
      {
        type: 1,
        description: 'Venda produtor',
        origin: 'Entrada',
        signal: true,
      },
      {
        type: 2,
        description: 'Venda afiliado',
        origin: 'Entrada',
        signal: true,
      },
      {
        type: 3,
        description: 'Comissão paga',
        origin: 'Saída',
        signal: false,
      },
      {
        type: 4,
        description: 'Comissão recebida',
        origin: 'Entrada',
        signal: false,
      },
    ];

    for (const typeData of typesToSeed) {
      const existingType = await this.transactionTypeRepository.findOne({
        where: { type: typeData.type },
      });

      if (!existingType) {
        const newType = this.transactionTypeRepository.create(typeData);
        await this.transactionTypeRepository.save(newType);
      }
    }
  }
}
