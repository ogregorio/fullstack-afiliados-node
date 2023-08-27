import parseSalesFile from '../file-parser';
import { Transaction } from 'src/@types/transaction.type';

describe('parseSalesFile', () => {
  it('should parse valid input lines correctly', () => {
    const content = `12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS`;

    const expectedTransactions: Transaction[] = [
      {
        relativeType: 1,
        date: new Date('2022-01-15T19:20:30-03:00'),
        product: 'CURSO DE BEM-ESTAR',
        amount: 127.5,
        salesman: 'JOSE CARLOS',
      },
    ];

    const parsedTransactions = parseSalesFile(content);

    expect(parsedTransactions).toEqual(expectedTransactions);
  });

  it('should throw an error for invalid lines', () => {
    const content = `1 2023-08-26T10:00:00Z Product     150050 Salesman1
                       InvalidLine
                       2 2023-08-25T15:30:00Z Item        80000 Salesman2`;

    expect(() => parseSalesFile(content)).toThrowError(
      'Invalid line in transactions file',
    );
  });
});
