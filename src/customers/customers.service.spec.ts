import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';
import {
  mockAddAccountParams,
  mockUpdateCustomerParams,
  mockUpdatedCustomerModel,
  mockCustomerModel,
  mockCustomerArrayModel,
} from './../common/test/mockCustomers';

describe('CustomersService', () => {
  let service: CustomersService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockCustomerArrayModel),
    findOne: jest.fn().mockReturnValue(mockCustomerModel),
    create: jest.fn().mockReturnValue(mockCustomerModel),
    save: jest.fn().mockReturnValue(mockCustomerModel),
    update: jest.fn().mockReturnValue(mockUpdatedCustomerModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all Customers', () => {
    it('Should list all customers', async () => {
      const customers = service.findAll();

      expect(customers).resolves.toBe(mockCustomerArrayModel);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Customer By Id', () => {
    it('Should find a existing customer', async () => {
      const customerFound = service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockCustomerModel.id);
      expect(customerFound).resolves.toBe(mockCustomerModel);
    });
    it('Should return a exception when does not to find a customer', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const customer = service.findOne(3);

      expect(customer).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith(3);
    });
  });

  describe('When create a customer', () => {
    it('Should create a customer', async () => {
      const customer = await service.create(mockAddAccountParams);

      expect(mockRepository.create).toBeCalledWith(mockAddAccountParams);
      expect(mockRepository.save).toBeCalledTimes(1);
      expect(customer).toBe(mockCustomerModel);
    });
  });

  describe('When update Customer', () => {
    it('Should update a customer', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockCustomerModel);
      mockRepository.create = jest
        .fn()
        .mockReturnValue(mockUpdatedCustomerModel);

      const customerUpdated = await service.update(1, mockUpdateCustomerParams);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(customerUpdated).toBe(mockUpdatedCustomerModel);
    });

    describe('When delete Customer', () => {
      it('Should delete a existing customer', async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockCustomerModel);

        await service.remove(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(mockRepository.delete).toBeCalledWith(mockCustomerModel);
      });

      it('Should return an internal server error if repository does not delete the customer', async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockCustomerModel);
        mockRepository.delete.mockReturnValueOnce(null);

        const deletedCustomer = service.remove(1);

        expect(service.findOne).toHaveBeenCalledWith(1);
        expect(mockRepository.delete).toBeCalledWith(mockCustomerModel);
        expect(deletedCustomer).rejects.toThrow(InternalServerErrorException);
      });
    });
  });
});
