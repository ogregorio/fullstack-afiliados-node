import { Entity, Column, OneToMany } from 'typeorm';
import { TransactionEntity } from 'src/@entities/transaction.entity';
import { DefaultBaseEntity } from 'src/@entities/base.entity';

@Entity()
export class TransactionTypeEntity extends DefaultBaseEntity {
  @Column()
  type: number;

  @Column()
  description: string;

  @Column()
  origin: string;

  @Column()
  signal: boolean;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.type)
  transactions: TransactionEntity[];
}
