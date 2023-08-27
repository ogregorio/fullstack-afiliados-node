import { faker } from '@faker-js/faker';
import { TransactionEntity } from '../transaction.entity';

export function generateTransactionData(): TransactionEntity {
  const transaction = new TransactionEntity();
  Object.assign(transaction, {
    relativeType: faker.number.float({ min: 1, max: 4 }),
    typeId: faker.string.uuid(),
    date: faker.date.recent(),
    product: faker.commerce.productName(),
    amount: faker.number.float({ min: 1, max: 1000, precision: 2 }),
    salesman: faker.person.firstName(),
    id: faker.string.uuid(),
    createAt: faker.date.recent(),
    modifyAt: faker.date.recent(),
    deleteAt: undefined,
  });
  return transaction;
}
