import { CreateCustomerDto } from '../../customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../customers/dto/update-customer.dto';
import { Customer, Gender } from './../../customers/entities/customer.entity';
import { mockOrderModel } from './mockOrders';

export const mockCreateCustomerParams: CreateCustomerDto = {
  name: 'Test Customer 1',
  cpf: '19047878000',
  gender: Gender.OTHER,
  email: 'email1@email.com',
};

export const mockUpdateCustomerParams: UpdateCustomerDto = {
  order: mockOrderModel,
};

export const mockCustomerModel: Customer = {
  id: 1,
  ...mockCreateCustomerParams,
  code: '123abc',
  beforeInsertActions: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const mockUpdatedCustomerModel: Customer = {
  ...mockCustomerModel,
  order: mockOrderModel,
  beforeInsertActions: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const mockCustomerArrayModel: Customer[] = [
  mockCustomerModel,
  {
    id: 2,
    code: '456cde',
    name: 'Test Customer 2',
    cpf: '25605432060',
    gender: Gender.OTHER,
    email: 'email2@email.com',
    beforeInsertActions: function (): void {
      throw new Error('Function not implemented.');
    },
  },
  {
    id: 3,
    code: '789fgh',
    name: 'Test Customer 3',
    cpf: '74513276045',
    gender: Gender.OTHER,
    email: 'email3@email.com',
    beforeInsertActions: function (): void {
      throw new Error('Function not implemented.');
    },
  },
];
