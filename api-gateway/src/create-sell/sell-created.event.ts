import { StocksNames } from '../types';

export class SellStock {
  constructor(
    public readonly userId: number,
    public readonly price: number,
    public readonly stockName: StocksNames,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      price: this.price,
      stockName: this.stockName,
    });
  }
}
