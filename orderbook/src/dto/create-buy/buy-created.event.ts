export class BuyStock {
  constructor(
    public readonly userId: number,
    public readonly price: number,
  ) {}

  toString() {
    return JSON.stringify({
      userId: this.userId,
      price: this.price,
    });
  }
}
