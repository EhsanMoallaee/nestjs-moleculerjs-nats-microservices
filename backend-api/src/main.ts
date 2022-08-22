import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { natsConfig } from './nats/nats.config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  const logger = new Logger('Main:bootstrap');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  
  const microservice = await NestFactory.createMicroservice(AppModule, {...natsConfig});
  await microservice.listen();
  Logger.log('🚀 Microservice is listening', 'Bootstrap-NATS Microservice');

  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap-HTTPServer');
}
bootstrap();