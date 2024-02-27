import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';
import { AppGateway } from './gateway/app.gateway';
import { Partitioners } from 'kafkajs';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_SERVICE',
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
            groupId: 'stock-consumer',
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
    CacheModule.registerAsync(RedisOptions),
  ],
  providers: [AppGateway],
})
export class AppModule {}
