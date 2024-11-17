import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  
  await app.listen(process.env.PORT);

  logger.log('');
  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`App running at ${process.env.HOST_API}`);
}
bootstrap();
