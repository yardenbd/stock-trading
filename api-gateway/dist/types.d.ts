export type StocksNames = 'AAPL' | 'AMZN' | 'GOOGL' | 'TSLA' | 'META';
export interface IStock {
    transactionType: 'buy' | 'sell';
    quantity: number;
    price: number;
    userId: number;
}
export type OrderbookTree = Record<StocksNames, IStock>;
