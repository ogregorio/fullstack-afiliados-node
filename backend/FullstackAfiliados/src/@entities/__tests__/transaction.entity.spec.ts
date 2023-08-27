import { generateTransactionTypeData } from '../__mocks__/transaction-type.mock';
import { generateTransactionData } from '../__mocks__/transaction.mock';
import { TransactionTypeEntity } from '../transaction-type.entity';
import { TransactionEntity } from '../transaction.entity';

describe('TransactionEntity', () => {
  it('should create a new transaction', () => {
    const transaction = new TransactionEntity();

    expect(transaction.createAt).toBeUndefined();
    expect(transaction.modifyAt).toEqual(transaction.createAt);
  });

  it('should associate with a transaction type', () => {
    const transaction = new TransactionEntity();
    const transactionType = new TransactionTypeEntity();

    const transactionData = generateTransactionData();
    const transactionTypeData = generateTransactionTypeData();

    Object.assign(transaction, transactionData);
    Object.assign(transactionType, transactionTypeData);

    transaction.type = transactionType;

    expect(transaction.type.id).toEqual(transactionType.id);
  });

  it('should set fields correctly', () => {
    const transaction = generateTransactionData();

    expect(transaction.typeId).toBeDefined();
    expect(transaction.date).toBeDefined();
    expect(transaction.product).toBeDefined();
    expect(transaction.amount).toBeDefined();
    expect(transaction.salesman).toBeDefined();
  });
});
