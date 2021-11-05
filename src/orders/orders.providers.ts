import { Connection } from 'typeorm';
import { Order } from './entities/order.entity';

export const ordersProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
];
