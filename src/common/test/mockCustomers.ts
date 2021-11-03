import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customers/dto/update-customer.dto';
import { Customer, Gender } from './../../customers/entities/customer.entity';

export const mockAddAccountParams: CreateCustomerDto = {
  code: 'abc123',
  name: 'Test Customer',
  cpf: '19047878000',
  gender: Gender.OTHER,
  email: 'email1@email.com',
};

export const mockUpdateCustomerParams: UpdateCustomerDto = {
  email: 'email-updated@email.com',
};

export const mockCustomerModel: Customer = {
  id: 1,
  ...mockAddAccountParams,
};

export const mockUpdatedCustomerModel: Customer = {
  ...mockCustomerModel,
  email: 'updated-email1@email.com',
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
  },
  {
    id: 3,
    code: '789fgh',
    name: 'Test Customer 3',
    cpf: '74513276045',
    gender: Gender.OTHER,
    email: 'email3@email.com',
  },
];
