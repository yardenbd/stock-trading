"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyStock = void 0;
class BuyStock {
    constructor(userId, price, stockName) {
        this.userId = userId;
        this.price = price;
        this.stockName = stockName;
    }
    toString() {
        return JSON.stringify({
            userId: this.userId,
            price: this.price,
            stockName: this.stockName,
        });
    }
}
exports.BuyStock = BuyStock;
//# sourceMappingURL=buy-created.event.js.map