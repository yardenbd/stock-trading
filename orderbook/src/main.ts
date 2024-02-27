import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['able-quagga-13305-us1-kafka.upstash.io:9092'],
          sasl: {
            mechanism: 'scram-sha-256',
            username:
              'YWJsZS1xdWFnZ2EtMTMzMDUkFNxijv0fzbM0ThcSuLpUgep6Qrfv-LDiMezsXfg',
            password: 'NjA2ZjMzZDUtODk2Yy00YzlhLWI1MGMtYzQzYzBlNmI2ODll',
          },
          ssl: true,
        },
        consumer: {
          groupId: 'orderbook-consumer',
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
