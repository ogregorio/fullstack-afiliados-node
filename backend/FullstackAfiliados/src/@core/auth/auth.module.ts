import { Module } from '@nestjs/common';
import { AuthService } from 'src/@core/auth/auth.service';
import { LocalStrategy } from 'src/@auth/local.strategy';
import { JwtStrategy } from 'src/@auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/@core/auth/auth.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('application.jwtSecret'),
        signOptions: {
          expiresIn:
            configService.get<string>('application.expiresInHours') + 'h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
