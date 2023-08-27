import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  username: process.env.SYSTEM_USERNAME || 'admin',
  password: process.env.SYSTEM_PASSWORD || 'admin',
  jwtSecret:
    process.env.JWT_SECRET ||
    '043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89',
  port: process.env.APPLICATION_PORT || 5001,
  env: process.env.NODE_ENV || 'Development',
  expiresInHours: process.env.EXPIRES_TOKEN_IN_HOURS || 4,
}));
