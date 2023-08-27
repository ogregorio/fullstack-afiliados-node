import { faker } from '@faker-js/faker';
import { TransactionTypeEntity } from '../transaction-type.entity';

export function generateTransactionTypeData(): TransactionTypeEntity {
  const type = new TransactionTypeEntity();
  Object.assign(type, {
    type: 1,
    description: faker.commerce.productAdjective(),
    origin: ['ENTRADA', 'SAIDA'][faker.number.int({ min: 0, max: 1 })],
    signal: faker.datatype.boolean(),
    createAt: faker.date.recent(),
    modifyAt: faker.date.recent(),
    id: faker.string.uuid(),
    deleteAt: undefined,
  });
  return type;
}
