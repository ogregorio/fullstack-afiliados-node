import { TransactionTypeEntity } from '../transaction-type.entity';
import { generateTransactionTypeData } from '../__mocks__/transaction-type.mock';
import { TransactionEntity } from '../transaction.entity';

describe('TransactionTypeEntity', () => {
  it('should create a new transaction type', () => {
    const transactionType = new TransactionTypeEntity();

    expect(transactionType.createAt).toBeUndefined();
    expect(transactionType.modifyAt).toEqual(transactionType.createAt);
  });

  it('should associate with transactions', () => {
    const transactionType = new TransactionTypeEntity();
    const transaction = new TransactionEntity();

    transactionType.transactions = [transaction];

    expect(transactionType.transactions).toContain(transaction);
  });

  it('should have type, description, origin, and signal', () => {
    const transactionType = generateTransactionTypeData();

    expect(transactionType.createAt).toBeDefined();
    expect(transactionType.description).toBeDefined();
    expect(transactionType.origin).toBeDefined();
    expect(transactionType.signal).toBeDefined();
  });
});
