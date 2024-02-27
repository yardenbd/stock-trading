"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellCreated = void 0;
class SellCreated {
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
exports.SellCreated = SellCreated;
//# sourceMappingURL=sell-created.event.js.map