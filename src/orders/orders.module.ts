import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PdfModule } from '../pdf/pdf.module';
import { DatabaseModule } from '../database/database.module';
import { ordersProviders } from './orders.providers';

@Module({
  imports: [DatabaseModule, PdfModule],
  controllers: [OrdersController],
  providers: [...ordersProviders, OrdersService],
})
export class OrdersModule {}
