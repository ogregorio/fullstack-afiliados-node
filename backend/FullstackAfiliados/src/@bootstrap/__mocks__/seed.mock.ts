import { faker } from '@faker-js/faker';

export function generateSeedData() {
  return {
    type: faker.number.float({ min: 1, max: 4 }),
    description: faker.company.buzzAdjective(),
    origin: faker.company.buzzAdjective(),
    signal: faker.datatype.boolean(),
  };
}
