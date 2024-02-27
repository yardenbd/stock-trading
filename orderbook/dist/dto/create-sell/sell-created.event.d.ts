import { StocksNames } from '../../types';
export declare class SellCreated {
    readonly userId: number;
    readonly price: number;
    readonly stockName: StocksNames;
    readonly quantity: number;
    constructor(userId: number, price: number, stockName: StocksNames, quantity: number);
    toString(): string;
}
