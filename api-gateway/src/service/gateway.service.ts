import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { MessageBody } from '@nestjs/websockets';
import { CacheService } from './cache.service';
import { BuyStock } from '../create-buy/buy-created.event';

export class GatewayService implements OnModuleInit {
  constructor(
    @Inject('BUY_STOCK_SERVICE') private readonly buyStockClient: ClientKafka,
    private readonly cacheService: CacheService,
  ) {}

  @MessagePattern('buy_stock')
  async handleBuy(@MessageBody() data: number) {}

  async onModuleInit() {
    this.buyStockClient.subscribeToResponseOf('buy_stock');
    await this.buyStockClient.connect();
  }
}
