"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const cache_manager_1 = require("@nestjs/cache-manager");
const redis_config_1 = require("./config/redis.config");
const app_gateway_1 = require("./gateway/app.gateway");
const kafkajs_1 = require("kafkajs");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'STOCK_SERVICE',
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
                            groupId: 'stock-consumer',
                        },
                        producer: {
                            createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner,
                        },
                    },
                },
            ]),
            cache_manager_1.CacheModule.registerAsync(redis_config_1.RedisOptions),
        ],
        providers: [app_gateway_1.AppGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map