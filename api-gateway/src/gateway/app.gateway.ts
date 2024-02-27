import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { BuyStock } from '../create-buy/buy-created.event';
import { CreateBuyRequest } from '../create-buy/create-buy-request.dto';
import { CreateSellRequest } from '../create-sell/create-sell-request.dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject('STOCK_SERVICE') private readonly stockClient: ClientKafka,
  ) {}

  @MessagePattern('buy_stock')
  @SubscribeMessage('buy')
  async handleBuyStock(@MessageBody() message: CreateBuyRequest) {
    this.stockClient
      .send('buy_stock', new BuyStock(10, message.price, message.stockName))
      .subscribe(async (kafkaMessage: string) => {
        this.server.emit('message', kafkaMessage);
      });
  }

  @MessagePattern('sell_stock')
  @SubscribeMessage('sell')
  async handleSellStock(@MessageBody() message: CreateSellRequest) {
    this.stockClient
      .send('sell_stock', new BuyStock(20, message.price, message.stockName))
      .subscribe(async (kafkaMessage: string) => {
        console.log('kafkaMessage', kafkaMessage);
      });
  }

  onModuleInit() {
    this.stockClient.subscribeToResponseOf('buy_stock');
    this.stockClient.connect();
    this.stockClient.subscribeToResponseOf('sell_stock');
    this.stockClient.connect();
  }
}
