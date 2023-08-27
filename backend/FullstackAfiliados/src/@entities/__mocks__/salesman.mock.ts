import { faker } from '@faker-js/faker';

export function generateSalesmanData() {
  return {
    totalAmount: faker.number.float({ min: 1, max: 1000, precision: 2 }),
    name: faker.person.firstName(),
  };
}
