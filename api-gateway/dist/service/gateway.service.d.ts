import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CacheService } from './cache.service';
export declare class GatewayService implements OnModuleInit {
    private readonly buyStockClient;
    private readonly cacheService;
    constructor(buyStockClient: ClientKafka, cacheService: CacheService);
    handleBuy(data: number): Promise<void>;
    onModuleInit(): Promise<void>;
}
