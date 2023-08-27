import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/@core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from 'src/@auth/local-auth.guard';

describe('AuthService', () => {
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        LocalAuthGuard,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    })
      .overrideProvider(JwtService)
      .useValue({
        sign: jest.fn(() => 'mockedToken'),
      })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn(),
      })
      .compile();

    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('validateUser', () => {
    it('should throw UnauthorizedException for invalid credentials', async () => {
      (configService.get as jest.Mock).mockReturnValue('validUsername');

      await expect(
        authService.validateUser('invalidUsername', 'invalidPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should generate a token and return AuthResponse', async () => {
      const mockUser = { username: 'mockedUser' };

      (configService.get as jest.Mock).mockReturnValue('1');

      const result = await authService.login(mockUser);

      expect(result.token).toBe('mockedToken');
      expect(result.name).toBe('mockedUser');
    });
  });
});
