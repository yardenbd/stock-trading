"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const client_1 = require("@clickhouse/client");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let DatabaseService = class DatabaseService {
    constructor() {
        this.client = (0, client_1.createClient)({
            host: process.env.CLICKHOUSE_HOST ||
                'https://hcoi4ygok8.eu-central-1.aws.clickhouse.cloud:8443',
            username: process.env.CLICKHOUSE_USER || 'default',
            password: process.env.CLICKHOUSE_PASSWORD || 'Npz3XOeGz.YdU',
        });
    }
    async insertTransaction(transaction) {
        console.log('transaction', transaction);
        const { price, quantity, stock_name, transaction_type, user_id } = transaction;
        const id = (0, uuid_1.v4)();
        await this.client.insert({
            table: 'transaction',
            values: [
                {
                    id,
                    stock_name,
                    price: +price,
                    quantity,
                    user_id,
                    transaction_type,
                },
            ],
            format: 'JSONEachRow',
        });
    }
    async insert(data, stockName) {
        const modifiedData = data.map((stock) => {
            return {
                ...stock,
                transaction_type: stock.transactionType,
                stock_name: stockName,
                id: (0, uuid_1.v4)(),
                user_id: stock.userId,
            };
        });
        return await this.client.insert({
            table: 'actions',
            values: modifiedData,
            format: 'JSONEachRow',
        });
    }
    async getAction(price, stockName) {
        if (typeof price !== 'number')
            return;
        if (isNaN(price))
            return;
        const query = `
  SELECT *
  FROM actions
  WHERE price = {val1: Int64}
  AND stock_name = {val2: String}
  ORDER BY created_at ASC
  LIMIT 1`;
        const data = await this.client.query({
            query,
            format: 'JSONEachRow',
            query_params: { val1: price, val2: stockName },
        });
        const parsedData = await data.json();
        return parsedData[0];
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map