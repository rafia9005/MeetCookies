import { Transport, ClientsModuleOptions } from '@nestjs/microservices';

export const rabbitMQConfig: ClientsModuleOptions = [
  {
    name: 'EMAIL_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'email',
      queueOptions: {
        durable: true,
      },
    },
  },
];
