import { StocksNames } from '../types';

export class CreateSellRequest {
  price: number;
  stockName: StocksNames;
}
