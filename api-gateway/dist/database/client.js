"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@clickhouse/client");
exports.client = (0, client_1.createClient)({
    host: process.env.CLICKHOUSE_HOST ||
        'https://hcoi4ygok8.eu-central-1.aws.clickhouse.cloud:8443',
    username: process.env.CLICKHOUSE_USER || 'default',
    password: process.env.CLICKHOUSE_PASSWORD || 'Npz3XOeGz.YdU',
});
//# sourceMappingURL=client.js.map