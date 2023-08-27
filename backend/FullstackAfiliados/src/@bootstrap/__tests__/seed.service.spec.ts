import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { SeedService } from 'src/@bootstrap/seed.service';
import { TransactionTypeEntity } from 'src/@entities/transaction-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { generateSeedData } from '../__mocks__/seed.mock';

const typesToSeed = [
  generateSeedData(),
  generateSeedData(),
  generateSeedData(),
  generateSeedData(),
];

describe('SeedService', () => {
  let seedService: SeedService;
  let transactionTypeRepository: Repository<TransactionTypeEntity>;

  const mockTransactionTypeRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: getRepositoryToken(TransactionTypeEntity),
          useValue: mockTransactionTypeRepository,
        },
      ],
    }).compile();

    seedService = module.get<SeedService>(SeedService);
    transactionTypeRepository = module.get<Repository<TransactionTypeEntity>>(
      getRepositoryToken(TransactionTypeEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('seedTransactionTypes', () => {
    it('should seed transaction types when they do not exist', async () => {
      // Configure the mock to return null for the first call and the typesToSeed for subsequent calls
      mockTransactionTypeRepository.findOne.mockResolvedValueOnce(null);
      mockTransactionTypeRepository.findOne.mockResolvedValueOnce(
        typesToSeed[0],
      );
      mockTransactionTypeRepository.findOne.mockResolvedValueOnce(
        typesToSeed[1],
      );
      mockTransactionTypeRepository.findOne.mockResolvedValueOnce(
        typesToSeed[2],
      );

      // Configure the create mock to return the input object
      mockTransactionTypeRepository.create.mockImplementation((data) => data);

      await seedService.seedTransactionTypes();

      expect(transactionTypeRepository.findOne).toHaveBeenCalledTimes(4);
      expect(transactionTypeRepository.create).toHaveBeenCalledTimes(1);
      expect(transactionTypeRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should not seed transaction types that already exist', async () => {
      // Configure the mock to return the typesToSeed for all calls
      mockTransactionTypeRepository.findOne.mockResolvedValue(typesToSeed[0]);

      await seedService.seedTransactionTypes();

      expect(transactionTypeRepository.findOne).toHaveBeenCalledTimes(4);
      expect(transactionTypeRepository.create).not.toHaveBeenCalled();
      expect(transactionTypeRepository.save).not.toHaveBeenCalled();
    });
  });
});
