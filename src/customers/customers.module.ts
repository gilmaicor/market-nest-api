import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DatabaseModule } from '../database/database.module';
import { customersProviders } from './customers.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [...customersProviders, CustomersService],
})
export class CustomersModule {}
