export type StocksNames = 'AAPL' | 'AMZN' | 'GOOGL' | 'TSLA' | 'META';
export type TransactionType = 'buy' | 'sell';
export interface IStock {
    transactionType: TransactionType;
    quantity: number;
    price: number;
    userId: number;
    created_at: Date;
}
export type OrderbookTree = Record<StocksNames, IStock>;
export interface IAction {
    id: string;
    stock_name: StocksNames;
    price: number;
    quantity: number;
    transaction_type: TransactionType;
    user_id: number;
    created_at: Date;
}
