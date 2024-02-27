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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const buy_created_event_1 = require("../create-buy/buy-created.event");
const create_buy_request_dto_1 = require("../create-buy/create-buy-request.dto");
const create_sell_request_dto_1 = require("../create-sell/create-sell-request.dto");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let AppGateway = class AppGateway {
    constructor(stockClient) {
        this.stockClient = stockClient;
    }
    async handleBuyStock(message) {
        this.stockClient
            .send('buy_stock', new buy_created_event_1.BuyStock(10, message.price, message.stockName))
            .subscribe(async (kafkaMessage) => {
            this.server.emit('message', kafkaMessage);
        });
    }
    async handleSellStock(message) {
        this.stockClient
            .send('sell_stock', new buy_created_event_1.BuyStock(20, message.price, message.stockName))
            .subscribe(async (kafkaMessage) => {
            console.log('kafkaMessage', kafkaMessage);
        });
    }
    onModuleInit() {
        this.stockClient.subscribeToResponseOf('buy_stock');
        this.stockClient.connect();
        this.stockClient.subscribeToResponseOf('sell_stock');
        this.stockClient.connect();
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, microservices_1.MessagePattern)('buy_stock'),
    (0, websockets_1.SubscribeMessage)('buy'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_buy_request_dto_1.CreateBuyRequest]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleBuyStock", null);
__decorate([
    (0, microservices_1.MessagePattern)('sell_stock'),
    (0, websockets_1.SubscribeMessage)('sell'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sell_request_dto_1.CreateSellRequest]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleSellStock", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __param(0, (0, common_1.Inject)('STOCK_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], AppGateway);
//# sourceMappingURL=app.gateway.js.map