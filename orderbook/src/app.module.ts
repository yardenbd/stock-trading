import { Module } from '@nestjs/common';
import { OrderbookService } from './orderbook.service';
import { DatabaseService } from './database/database.service';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [OrderbookService, DatabaseService],
})
export class AppModule {}
