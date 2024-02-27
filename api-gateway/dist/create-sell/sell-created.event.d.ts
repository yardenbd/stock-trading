import { StocksNames } from '../types';
export declare class SellStock {
    readonly userId: number;
    readonly price: number;
    readonly stockName: StocksNames;
    constructor(userId: number, price: number, stockName: StocksNames);
    toString(): string;
}
