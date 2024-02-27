"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellStock = void 0;
class SellStock {
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
exports.SellStock = SellStock;
//# sourceMappingURL=sell-created.event.js.map