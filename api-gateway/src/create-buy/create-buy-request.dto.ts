import { StocksNames } from '../types';

export class CreateBuyRequest {
  price: number;
  stockName: StocksNames;
}
