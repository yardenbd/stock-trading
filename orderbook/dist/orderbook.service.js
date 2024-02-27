"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderbookService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database/database.service");
let OrderbookService = class OrderbookService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.buyHash = new Map();
        this.sellHash = new Map();
        this.totalPriceHash = new Map();
    }
    setCurrentPrice(stockName, currPrice) {
        if (!this.totalPriceHash.get(stockName)) {
            this.totalPriceHash.set(stockName, {
                totalPrice: currPrice,
            });
        }
        this.totalPriceHash.get(stockName).totalPrice = currPrice;
    }
    reduceFunc(hashName, stockName) {
        const total = this[hashName].get(stockName).reduce((accumulator, obj) => {
            accumulator.price = +accumulator.price + +obj.price;
            accumulator.quantity = +accumulator.quantity + +obj.quantity;
            return accumulator;
        }, { price: 0, quantity: 0 });
        return total;
    }
    calcCurrentPrice(stockName) {
        let totalBuys = { price: 0, quantity: 0 };
        let totalSells = { price: 0, quantity: 0 };
        if (this.buyHash.get(stockName)) {
            totalBuys = this.reduceFunc('buyHash', stockName);
        }
        if (this.sellHash.get(stockName)) {
            totalSells = this.reduceFunc('sellHash', stockName);
        }
        const totalPrice = totalBuys.price + totalSells.price;
        const totalQuantity = totalBuys.quantity + totalSells.quantity;
        return totalPrice / totalQuantity;
    }
    setNewHash(hashName, stockName, data) {
        this[hashName].set(stockName, [data]);
    }
    async checkIfInDb(price, stockName) {
        const inDb = await this.databaseService.getAction(price, stockName);
        if (inDb)
            return inDb;
        else
            return null;
    }
    async handleBuy(data) {
        const { price, stockName, userId, quantity } = data;
        if (this.buyHash.get(stockName).length === 5) {
            console.log('big 5 length');
            await this.databaseService.insert(this.buyHash.get(stockName), stockName);
            this.setNewHash('buyHash', stockName, {
                transactionType: 'buy',
                price,
                quantity,
                userId,
                created_at: new Date(),
            });
            console.log('this.buyHash after insert', this.buyHash);
        }
        else {
            const randomNumber = Math.floor(Math.floor(Math.random() * 10) + 1);
            this.buyHash.get(stockName).push({
                transactionType: 'buy',
                price,
                quantity: randomNumber,
                userId,
                created_at: new Date(),
            });
            console.log('this.buyHash', this.buyHash);
        }
    }
    async handleSell(data) {
        const { price, stockName, userId, quantity } = data;
        if (this.sellHash.get(stockName).length === 5) {
            console.log('this.sell length 0f 5');
            await this.databaseService.insert(this.sellHash.get(stockName), stockName);
            this.setNewHash('sellHash', stockName, {
                transactionType: 'sell',
                price,
                quantity,
                userId,
                created_at: new Date(),
            });
        }
        else {
            this.sellHash.get(stockName).push({
                transactionType: 'sell',
                price,
                quantity: 1,
                userId,
                created_at: new Date(),
            });
            console.log('sellHash', this.sellHash);
        }
    }
    async handleBuyCreated(data) {
        const { price, userId, stockName, quantity = 1 } = data;
        const isStockInSellHash = this.sellHash.get(stockName);
        if (isStockInSellHash) {
            const transactionIndex = isStockInSellHash.findIndex((ord) => {
                if (ord.price === price)
                    return ord;
            });
            if (transactionIndex > -1) {
                const userBuy = await this.handleTrade({
                    transactionType: 'buy',
                    price,
                    quantity,
                    stockName,
                    transactionIndex,
                    userId,
                });
                const userSell = await this.handleTrade({
                    transactionType: 'sell',
                    price,
                    quantity,
                    stockName,
                    transactionIndex,
                    userId: isStockInSellHash[transactionIndex].userId,
                });
                return { userBuy, userSell };
            }
        }
        const dbAction = await this.checkIfInDb(+price, stockName);
        if (dbAction) {
            const { transaction_type: transactionType, price: dbPrice, quantity: dbQuantity, user_id, } = dbAction;
            const userBuy = await this.handleTrade({
                transactionType: 'buy',
                price: +dbPrice,
                quantity: dbQuantity,
                stockName,
                userId: user_id,
            });
            const userSell = await this.handleTrade({
                transactionType,
                price: +dbPrice,
                quantity: dbQuantity,
                stockName,
                userId: user_id,
            });
            return { userBuy, userSell };
        }
        if (!this.buyHash.has(stockName)) {
            this.setNewHash('buyHash', stockName, {
                transactionType: 'buy',
                price,
                quantity,
                userId,
                created_at: new Date(),
            });
            const currentPrice = this.calcCurrentPrice(stockName);
            this.setCurrentPrice(stockName, currentPrice);
            console.log('buyHash', this.buyHash);
        }
        else {
            await this.handleBuy({ ...data, quantity });
        }
    }
    async handleSellCreated(data) {
        const { price, userId, stockName, quantity = 1 } = data;
        const isStockInBuyHash = this.buyHash.get(stockName);
        if (isStockInBuyHash) {
            const transactionIndex = isStockInBuyHash.findIndex((ord) => {
                if (ord.price === price)
                    return ord;
            });
            if (transactionIndex > -1) {
                const userSell = await this.handleTrade({
                    transactionType: 'sell',
                    price,
                    quantity,
                    stockName,
                    userId,
                });
                const userBuy = await this.handleTrade({
                    transactionType: 'buy',
                    price,
                    stockName,
                    userId: isStockInBuyHash[transactionIndex].userId,
                    quantity,
                });
                return { userBuy, userSell };
            }
        }
        const dbAction = await this.checkIfInDb(+price, stockName);
        if (dbAction) {
            const { transaction_type: transactionType, price: dbPrice, quantity: dbQuantity, user_id, } = dbAction;
            const userSell = await this.handleTrade({
                transactionType: 'sell',
                price: +dbPrice,
                quantity: dbQuantity,
                stockName,
                userId,
            });
            const userBuy = await this.handleTrade({
                transactionType,
                price: +dbPrice,
                quantity: dbQuantity,
                stockName,
                userId: user_id,
            });
            return { userBuy, userSell };
        }
        if (!this.sellHash.has(stockName)) {
            this.setNewHash('sellHash', stockName, {
                transactionType: 'sell',
                price,
                quantity,
                userId,
                created_at: new Date(),
            });
            const currentPrice = this.calcCurrentPrice(stockName);
            this.setCurrentPrice(stockName, currentPrice);
            console.log('sellHash', this.sellHash);
        }
        else {
            await this.handleSell({ ...data, quantity });
        }
    }
    async handleTrade(tradeInfo) {
        console.log('TRANSACTION !!');
        const { transactionIndex, transactionType, price, quantity, stockName, userId, } = tradeInfo;
        if (transactionIndex) {
            const hashName = transactionType === 'buy' ? 'buyHash' : 'sellHash';
            this[hashName].get(stockName).splice(transactionIndex, 0);
        }
        const resp = await this.databaseService.insertTransaction({
            transaction_type: transactionType,
            user_id: userId,
            price,
            quantity,
            stock_name: stockName,
        });
        return resp;
    }
};
exports.OrderbookService = OrderbookService;
exports.OrderbookService = OrderbookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrderbookService);
//# sourceMappingURL=orderbook.service.js.map