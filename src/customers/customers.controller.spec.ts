import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { mockRepository } from './customers.service.spec';
import { mockCreateCustomerParams, mockCustomerArrayModel, mockCustomerModel, mockUpdateCustomerParams } from '../common/test/mockCustomers';

describe('TesteController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When create a Customer', () => {
    it('should call the create service', () => {
      service.create = jest.fn().mockReturnValueOnce(mockCustomerModel);
      controller.create(mockCreateCustomerParams)
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search all Customers', () => {
    it('should call the findAll service', () => {
      service.findAll = jest.fn().mockReturnValueOnce(mockCustomerArrayModel);
      controller.findAll()
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Customer By Id', () => {
    it('should call the findOne service', () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockCustomerModel);
      controller.findOne('1')
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When update Customer', () => {
    it('should call the update service', () => {
      service.update = jest.fn().mockReturnValueOnce(mockCustomerModel);
      controller.update('1', mockUpdateCustomerParams)
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('When remove Customer', () => {
    it('should call the remove service', () => {
      service.remove = jest.fn().mockReturnValueOnce(true);
      controller.remove('1')
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
