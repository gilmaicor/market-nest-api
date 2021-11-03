import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forRoot({}), Customer],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
