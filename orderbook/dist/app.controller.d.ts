import { OrderbookService } from './orderbook.service';
import { BuyCreated } from './buy-created.event';
import { SellCreated } from './dto/create-sell/sell-created.event';
export declare class AppController {
    readonly orderbookService: OrderbookService;
    constructor(orderbookService: OrderbookService);
    handleBuyCreated(data: BuyCreated): Promise<string>;
    handleSellCreated(data: SellCreated): Promise<void>;
}
