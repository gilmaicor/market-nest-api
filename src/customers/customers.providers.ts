import { Connection } from 'typeorm';
import { Customer } from './entities/customer.entity';

export const customersProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Customer),
    inject: ['DATABASE_CONNECTION'],
  },
];
