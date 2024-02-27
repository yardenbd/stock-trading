import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateBuyRequest } from '../create-buy/create-buy-request.dto';
import { CreateSellRequest } from '../create-sell/create-sell-request.dto';
import { Server } from 'socket.io';
export declare class AppGateway implements OnModuleInit {
    private readonly stockClient;
    server: Server;
    constructor(stockClient: ClientKafka);
    handleBuyStock(message: CreateBuyRequest): Promise<void>;
    handleSellStock(message: CreateSellRequest): Promise<void>;
    onModuleInit(): void;
}
