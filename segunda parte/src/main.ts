import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('PokéAPI')
    .setDescription('API para consultar información sobre Pokémon')
    .setVersion('1.0')
    .addTag('Pokémon')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);

  logger.log('');
  logger.log(`🚀 Application is running on: ${process.env.HOST_API}`);
  logger.log(`🌐 Access the API at: http://localhost:${process.env.PORT}`);
}
bootstrap();
