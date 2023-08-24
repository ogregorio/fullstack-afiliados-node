import { Entity, Column, OneToMany } from 'typeorm';
import { Transaction } from 'src/@entities/transaction.entity';
import { DefaultBaseEntity } from 'src/@entities/base.entity';

@Entity()
export class TransactionType extends DefaultBaseEntity {
  @Column()
  type: number;

  @Column()
  description: string;

  @Column()
  origin: string;

  @Column()
  signal: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.type)
  transactions: Transaction[];
}
