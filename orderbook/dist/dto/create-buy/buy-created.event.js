"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyStock = void 0;
class BuyStock {
    constructor(userId, price) {
        this.userId = userId;
        this.price = price;
    }
    toString() {
        return JSON.stringify({
            userId: this.userId,
            price: this.price,
        });
    }
}
exports.BuyStock = BuyStock;
//# sourceMappingURL=buy-created.event.js.map