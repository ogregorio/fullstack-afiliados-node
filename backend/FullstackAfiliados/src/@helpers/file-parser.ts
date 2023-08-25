import { Transaction } from 'src/@types/transaction.type';

function parseSalesFile(content: string): Transaction[] {
  const transactions: Transaction[] = [];
  const lines: string[] = content.split('\n');

  try {
    for (const line of lines) {
      if (line.trim() !== '') {
        const transaction = {
          relativeType: parseInt(line.substring(0, 1)),
          date: new Date(Date.parse(line.substring(1, 26))),
          product: line.substring(26, 56).trim(),
          amount: parseFloat(line.substring(56, 66)) / 100,
          salesman: line.substring(66).trim(),
        };
        if (isNotValid(transaction)) {
          throw new Error('Failed at reading transactions file');
        }
        transactions.push(transaction);
      }
    }
  } catch (e) {
    throw new Error('Invalid line in transactions file');
  }

  return transactions;
}

const isNotValid = (t: Transaction): boolean => {
  return isNaN(t.amount) || !(t.date instanceof Date);
};

export default parseSalesFile;
