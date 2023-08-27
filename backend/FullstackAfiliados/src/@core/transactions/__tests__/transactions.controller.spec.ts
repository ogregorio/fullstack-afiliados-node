import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from 'src/@core/transactions/transactions.controller';
import { TransactionsService } from 'src/@core/transactions/transactions.service';
import { BadRequestException } from '@nestjs/common';
import { TransactionEntity } from 'src/@entities/transaction.entity';
import { Salesman } from 'src/@types/salesman.type';
import { generateTransactionTypeData } from 'src/@entities/__mocks__/transaction-type.mock';
import { generateTransactionData } from 'src/@entities/__mocks__/transaction.mock';
import { generateSalesmanData } from 'src/@entities/__mocks__/salesman.mock';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            readFileContent: jest.fn(),
            getTransactionsBySalesman: jest.fn(),
            getSalesman: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  describe('uploadFile', () => {
    it('should upload a file successfully', async () => {
      const mockFile = {
        originalname: 'file.csv',
        buffer: Buffer.from('file content'),
      } as Express.Multer.File;
      const result = await controller.uploadFile(mockFile);

      expect(result).toEqual({ success: true });
      expect(service.readFileContent).toHaveBeenCalledWith(mockFile);
    });

    it('should throw BadRequestException on file upload failure', async () => {
      (service.readFileContent as jest.Mock).mockRejectedValue(new Error());

      await expect(
        controller.uploadFile({} as Express.Multer.File),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getTransactionsBySalesman', () => {
    it('should get transactions by salesman', async () => {
      const salesman = 'John Doe';
      const mockTransactions: TransactionEntity[] = [new TransactionEntity()];

      Object.assign(generateTransactionData(), mockTransactions[0]);

      (service.getTransactionsBySalesman as jest.Mock).mockResolvedValue(
        mockTransactions,
      );

      const result = await controller.getTransactionsBySalesman(salesman);

      expect(result).toEqual(mockTransactions);
      expect(service.getTransactionsBySalesman).toHaveBeenCalledWith(salesman);
    });
  });

  describe('getSalesman', () => {
    it('should get salesman data', async () => {
      const mockSalesmen: Salesman[] = [generateSalesmanData()];

      (service.getSalesman as jest.Mock).mockResolvedValue(mockSalesmen);

      const result = await controller.getSalesman();

      expect(result).toEqual(mockSalesmen);
      expect(service.getSalesman).toHaveBeenCalled();
    });
  });
});
