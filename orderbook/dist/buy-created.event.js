"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyCreated = void 0;
class BuyCreated {
    constructor(userId, price, stockName, quantity) {
        this.userId = userId;
        this.price = price;
        this.stockName = stockName;
        this.quantity = quantity;
    }
    toString() {
        return JSON.stringify({
            userId: this.userId,
            price: this.price,
            stockName: this.stockName,
            quantity: this.quantity,
        });
    }
}
exports.BuyCreated = BuyCreated;
//# sourceMappingURL=buy-created.event.js.map