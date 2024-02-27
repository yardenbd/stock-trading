import { createClient } from '@clickhouse/client';
import { Injectable } from '@nestjs/common';
import { ICreateTransaction } from '../dto/create-transaction/create-transaction.dto';
import { IAction, IStock, StocksNames } from '../types';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DatabaseService {
  client = createClient({
    host:
      process.env.CLICKHOUSE_HOST ||
      'https://hcoi4ygok8.eu-central-1.aws.clickhouse.cloud:8443',
    username: process.env.CLICKHOUSE_USER || 'default',
    password: process.env.CLICKHOUSE_PASSWORD || 'Npz3XOeGz.YdU',
  });

  public async insertTransaction(transaction: ICreateTransaction) {
    console.log('transaction', transaction);
    const { price, quantity, stock_name, transaction_type, user_id } =
      transaction;
    const id = uuidv4();
    await this.client.insert({
      table: 'transaction',
      values: [
        {
          id,
          stock_name,
          price: +price,
          quantity,
          user_id,
          transaction_type,
        },
      ],
      format: 'JSONEachRow',
    });
  }

  public async insert(data: IStock[], stockName: StocksNames) {
    const modifiedData: IAction[] = data.map((stock) => {
      return {
        ...stock,
        transaction_type: stock.transactionType,
        stock_name: stockName,
        id: uuidv4(),
        user_id: stock.userId,
      };
    });
    return await this.client.insert({
      table: 'actions',
      values: modifiedData,
      format: 'JSONEachRow',
    });
  }

  public async getAction(price: number, stockName: StocksNames) {
    if (typeof price !== 'number') return;
    if (isNaN(price)) return;
    const query = `
  SELECT *
  FROM actions
  WHERE price = {val1: Int64}
  AND stock_name = {val2: String}
  ORDER BY created_at ASC
  LIMIT 1`;

    const data = await this.client.query({
      query,
      format: 'JSONEachRow',
      query_params: { val1: price, val2: stockName },
    });
    const parsedData = await data.json<IAction[]>();
    return parsedData[0];
  }
}
