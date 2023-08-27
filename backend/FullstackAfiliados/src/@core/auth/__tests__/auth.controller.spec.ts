import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/@core/auth/auth.controller';
import { AuthService } from 'src/@core/auth/auth.service';
import { getSuccessResponse } from '../__mocks__/auth.mock';
import { LocalAuthGuard } from 'src/@auth/local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an authentication token when valid credentials are provided', async () => {
      const userPayload = {
        username: 'testuser',
        password: 'testpassword',
      };

      jest
        .spyOn(authService, 'login')
        .mockResolvedValue(getSuccessResponse(userPayload.username));

      const result = await authController.login(userPayload);

      expect(result.token).toBeDefined();
      expect(result.name).toEqual(userPayload.username);
    });

    it('should call the AuthService login method with provided credentials', async () => {
      const userPayload = {
        username: 'testuser',
        password: 'testpassword',
      };
      jest
        .spyOn(authService, 'login')
        .mockResolvedValue(getSuccessResponse(userPayload.username));

      await authController.login(userPayload);

      expect(authService.login).toHaveBeenCalledWith(userPayload);
    });
  });
});
