import { TransactionType, StocksNames } from '../../types';
export interface ICreateTransaction {
    stock_name: StocksNames;
    price: number;
    quantity: number;
    user_id: number;
    transaction_type: TransactionType;
}
export interface ICreateUserTransaction {
    buy_user_id: number;
    sell_user_id: number;
    transaction_id: string;
}
