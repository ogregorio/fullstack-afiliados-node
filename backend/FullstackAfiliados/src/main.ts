import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(
    dotenv.config().error ? 'Dotenv file not found' : 'Using dotenv',
    'Environment',
  );

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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5001);
}
bootstrap();
