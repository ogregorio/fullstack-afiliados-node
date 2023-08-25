import { Transaction } from 'src/@types/transaction.type';

function parseSalesFile(content: string): Transaction[] {
  const transactions: Transaction[] = [];
  const lines: string[] = content.split('\n');

  try {
    for (const line of lines) {
      if (line.trim() !== '') {
        const transaction = {
          RelativeType: parseInt(line.substring(0, 1)),
          Date: new Date(Date.parse(line.substring(1, 26))),
          Product: line.substring(26, 56).trim(),
          Amount: parseFloat(line.substring(56, 66)) / 100,
          Salesman: line.substring(66).trim(),
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
  return isNaN(t.Amount) || !(t.Date instanceof Date);
};

export default parseSalesFile;
