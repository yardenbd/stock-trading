"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const kafkajs_1 = require("kafkajs");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['able-quagga-13305-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'YWJsZS1xdWFnZ2EtMTMzMDUkFNxijv0fzbM0ThcSuLpUgep6Qrfv-LDiMezsXfg',
                    password: 'NjA2ZjMzZDUtODk2Yy00YzlhLWI1MGMtYzQzYzBlNmI2ODll',
                },
                ssl: true,
            },
            consumer: {
                groupId: 'orderbook-consumer',
            },
            producer: {
                createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner,
            },
        },
    });
    app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map