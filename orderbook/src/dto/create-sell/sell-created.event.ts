import { StocksNames } from '../../types';

export class SellCreated {
  constructor(
    public readonly userId: number,
    public readonly price: number,
    public readonly stockName: StocksNames,
    public readonly quantity: number,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      price: this.price,
      stockName: this.stockName,
      quantity: this.quantity,
    });
  }
}
