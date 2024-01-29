import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { Order, PaymentMethod } from './../../orders/entities/order.entity';
import { mockCustomerModel } from './mockCustomers';
import { mockProductArrayModel } from './mockProducts';

export const mockCreateOrderParams: CreateOrderDto = {
  date: new Date('2021-03-11 07:37:13'),
  note: 'Pagamento à vista',
  paymentMethod: PaymentMethod.CASH,
  products: mockProductArrayModel,
  customer: mockCustomerModel,
};

export const mockUpdateOrderParams: UpdateOrderDto = {
  paymentMethod: PaymentMethod.CHECK,
};

export const mockOrderModel: Order = {
  id: 1,
  code: '123abc',
  ...mockCreateOrderParams,
  beforeInsertActions: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const mockUpdatedOrderModel: Order = {
  ...mockOrderModel,
  paymentMethod: PaymentMethod.CASH,
  beforeInsertActions: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const mockOrderArrayModel: Order[] = [
  mockOrderModel,
  {
    id: 2,
    code: '456cde',
    date: new Date('2021-03-11 07:37:13'),
    note: 'Pagamento parcelado',
    paymentMethod: PaymentMethod.CARD,
    products: mockProductArrayModel,
    customer: mockCustomerModel,
    beforeInsertActions: function (): void {
      throw new Error('Function not implemented.');
    },
  },
  {
    id: 3,
    code: '789fgh',
    date: new Date('2021-03-11 07:37:13'),
    note: 'Pagamento faltando',
    paymentMethod: PaymentMethod.CHECK,
    products: mockProductArrayModel,
    customer: mockCustomerModel,
    beforeInsertActions: function (): void {
      throw new Error('Function not implemented.');
    },
  },
];
