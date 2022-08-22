import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        url: process.env.NATS_URL || 'nats://nats:4222',
      },
    }
  )
  app.listen()
  Logger.log('🚀 Microservice is listening', 'Bootstrap-NATS Microservice');
}
bootstrap();
