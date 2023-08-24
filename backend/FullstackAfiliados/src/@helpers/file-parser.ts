import { Transaction } from 'src/@types/transaction.type';

function parseSalesFile(content: string): Transaction[] {
  const transactions: Transaction[] = [];
  const lines: string[] = content.split('\n');

  try {
    for (const line of lines) {
      if (line.trim() !== '') {
        transactions.push({
          RelativeType: parseInt(line.substring(0, 1)),
          Date: new Date(Date.parse(line.substring(1, 26))),
          Product: line.substring(26, 56).trim(),
          Amount: parseFloat(line.substring(56, 66)) / 100,
          Salesman: line.substring(66).trim(),
        });
      }
    }
  } catch (e) {
    throw new Error('Invalid line in transactions file');
  }

  return transactions;
}

export default parseSalesFile;
