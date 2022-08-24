import { NatsOptions, Transport } from '@nestjs/microservices';

export const natsConfig: NatsOptions = {
  transport: Transport.NATS,
  options: {
    servers: [process.env.NATS_URL] 
    // || 'nats://127.0.0.1:4222',
  },
};
