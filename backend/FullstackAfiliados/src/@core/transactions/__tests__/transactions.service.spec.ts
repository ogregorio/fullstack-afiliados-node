import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from 'src/@core/transactions/transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from 'src/@entities/transaction.entity';
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';
import { generateSalesmanData } from 'src/@entities/__mocks__/salesman.mock';
import { generateTransactionData } from 'src/@entities/__mocks__/transaction.mock';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionRepository: Repository<TransactionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TransactionTypeEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get(getRepositoryToken(TransactionEntity));
  });

  describe('getTransactionsBySalesman', () => {
    it('should return transactions for a specific salesman', async () => {
      const transactions = [
        generateTransactionData(),
        generateTransactionData(),
        generateTransactionData(),
      ];
      const salesman = transactions[0].salesman;

      jest.spyOn(transactionRepository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(transactions),
      } as any);

      const result =
        await transactionsService.getTransactionsBySalesman(salesman);
      expect(result[0].salesman).toEqual(transactions[0].salesman);
    });
  });

  describe('getSalesman', () => {
    it('should return a list of salesmen with total amounts', async () => {
      const salesmenData = generateSalesmanData();

      jest.spyOn(transactionRepository, 'createQueryBuilder').mockReturnValue({
        groupBy: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([salesmenData]),
      } as any);

      const result = await transactionsService.getSalesman();
      expect(result[0]).toEqual(salesmenData);
    });
  });
});
