import { Entity, Column, ManyToOne } from 'typeorm';
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';
import { DefaultBaseEntity } from 'src/@entities/base.entity';

@Entity()
export class TransactionEntity extends DefaultBaseEntity {
  @ManyToOne(() => TransactionTypeEntity, (type) => type.transactions)
  type: TransactionTypeEntity;

  @Column()
  typeId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  product: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  salesman: string;
}
