import { NatsOptions, Transport } from '@nestjs/microservices';

export const natsConfig: NatsOptions = {
  transport: Transport.NATS,
  options: {
    url: process.env.NATS_URL || 'nats://nats:4222',
  },
};
