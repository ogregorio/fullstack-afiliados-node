import { Entity, Column, ManyToOne } from 'typeorm';
import { TransactionType } from 'src/@entities/transaction-type.entity';
import { DefaultBaseEntity } from 'src/@entities/base.entity';

@Entity()
export class Transaction extends DefaultBaseEntity {
  @ManyToOne(() => TransactionType, (type) => type.transactions)
  type: TransactionType;

  @Column()
  typeId: string;

  @Column()
  date: Date;

  @Column()
  product: string;

  @Column()
  amount: number;

  @Column()
  salesman: string;
}
