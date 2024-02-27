import { BuyCreated } from './buy-created.event';
import { SellCreated } from './dto/create-sell/sell-created.event';
import { TransactionType, IStock, StocksNames } from './types';
import { DatabaseService } from './database/database.service';
export declare class OrderbookService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    buyHash: Map<StocksNames, IStock[]>;
    sellHash: Map<StocksNames, IStock[]>;
    totalPriceHash: Map<StocksNames, {
        totalPrice: number;
    }>;
    setCurrentPrice(stockName: StocksNames, currPrice: number): void;
    reduceFunc(hashName: 'buyHash' | 'sellHash', stockName: StocksNames): {
        price: number;
        quantity: number;
    };
    calcCurrentPrice(stockName: StocksNames): number;
    setNewHash(hashName: 'buyHash' | 'sellHash', stockName: StocksNames, data: IStock): void;
    checkIfInDb(price: number, stockName: StocksNames): Promise<import("./types").IAction>;
    handleBuy(data: BuyCreated): Promise<void>;
    handleSell(data: SellCreated): Promise<void>;
    handleBuyCreated(data: BuyCreated): Promise<{
        userBuy: void;
        userSell: void;
    }>;
    handleSellCreated(data: BuyCreated): Promise<{
        userBuy: void;
        userSell: void;
    }>;
    handleTrade(tradeInfo: {
        transactionType: TransactionType;
        stockName: StocksNames;
        quantity: number;
        price: number;
        userId: number;
        transactionIndex?: number;
    }): Promise<void>;
}
