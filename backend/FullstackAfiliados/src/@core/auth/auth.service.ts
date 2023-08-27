import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthReponse, User } from 'src/@types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    // Get the system username and password from environment variables
    const systemUsername = this.configService.get<string>(
      'application.username',
    );
    const systemPassword = this.configService.get<string>(
      'application.password',
    );

    // Compare the provided username and password with the system credentials
    if (username === systemUsername && pass === systemPassword) {
      return { username };
    }

    // If credentials are not valid, throw UnauthorizedException
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: User): Promise<AuthReponse> {
    const payload = { username: user.username };
    const hours: number = Number(
      this.configService.get<string>('application.expiresInHours'),
    );
    return {
      expiresIn: new Date(new Date().getTime() + hours * 60 * 60 * 1000),
      token: this.jwtService.sign(payload),
      name: payload.username,
    };
  }
}
