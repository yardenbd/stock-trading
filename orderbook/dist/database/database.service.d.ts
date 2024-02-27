/// <reference types="node" />
import { ICreateTransaction } from '../dto/create-transaction/create-transaction.dto';
import { IAction, IStock, StocksNames } from '../types';
export declare class DatabaseService {
    client: import("@clickhouse/client").ClickHouseClient<import("stream").Readable>;
    insertTransaction(transaction: ICreateTransaction): Promise<void>;
    insert(data: IStock[], stockName: StocksNames): Promise<import("@clickhouse/client-common").ConnInsertResult>;
    getAction(price: number, stockName: StocksNames): Promise<IAction>;
}
