import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  const config = new DocumentBuilder()
    .setTitle('Fullstack Afiliados')
    .setDescription('Back-end Challenge - Fullstack Afiliados')
    .setVersion('1.0')
    .addTag('afiliados')
    .setContact(
      'Arthur Gregório',
      'https://github.com/ogregorio/',
      'arthurgregorioleal@mail.com',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(5001);
}
bootstrap();
