import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderbookService } from './orderbook.service';
import { BuyCreated } from './buy-created.event';
import { SellCreated } from './dto/create-sell/sell-created.event';

@Controller()
export class AppController {
  constructor(public readonly orderbookService: OrderbookService) {}
  @MessagePattern('buy_stock')
  async handleBuyCreated(data: BuyCreated) {
    console.log('BUY CONTROLLER');
    await this.orderbookService.handleBuyCreated(data);
    return 'Stock order created successfully';
  }

  @MessagePattern('sell_stock')
  async handleSellCreated(data: SellCreated) {
    console.log('here');
    await this.orderbookService.handleSellCreated(data);
  }
}
