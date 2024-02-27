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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const orderbook_service_1 = require("./orderbook.service");
const buy_created_event_1 = require("./buy-created.event");
const sell_created_event_1 = require("./dto/create-sell/sell-created.event");
let AppController = class AppController {
    constructor(orderbookService) {
        this.orderbookService = orderbookService;
    }
    async handleBuyCreated(data) {
        console.log('BUY CONTROLLER');
        await this.orderbookService.handleBuyCreated(data);
        return 'Stock order created successfully';
    }
    async handleSellCreated(data) {
        console.log('here');
        await this.orderbookService.handleSellCreated(data);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)('buy_stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_created_event_1.BuyCreated]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleBuyCreated", null);
__decorate([
    (0, microservices_1.MessagePattern)('sell_stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sell_created_event_1.SellCreated]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleSellCreated", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [orderbook_service_1.OrderbookService])
], AppController);
//# sourceMappingURL=app.controller.js.map