import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import {
  mockAddAccountParams,
  mockUpdateOrderParams,
  mockUpdatedOrderModel,
  mockOrderModel,
  mockOrderArrayModel,
} from './../common/test/mockOrders';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockOrderArrayModel),
    findOne: jest.fn().mockReturnValue(mockOrderModel),
    create: jest.fn().mockReturnValue(mockOrderModel),
    save: jest.fn().mockReturnValue(mockOrderModel),
    update: jest.fn().mockReturnValue(mockUpdatedOrderModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  const options = {
    loadEagerRelations: true,
    relations: ['customer', 'products'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all Orders', () => {
    it('Should list all orders', async () => {
      const orders = service.findAll();

      expect(orders).resolves.toBe(mockOrderArrayModel);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Order By Id', () => {
    it('Should find a existing order', async () => {
      const orderFound = service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith(
        mockOrderModel.id,
        options,
      );
      expect(orderFound).resolves.toBe(mockOrderModel);
    });
    it('Should return a exception when does not to find a order', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const order = service.findOne(3);

      expect(order).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith(3, options);
    });
  });

  describe('When create a order', () => {
    it('Should create a order', async () => {
      const order = await service.create(mockAddAccountParams);

      expect(mockRepository.create).toBeCalledWith(mockAddAccountParams);
      expect(mockRepository.save).toBeCalledTimes(1);
      expect(order).toBe(mockOrderModel);
    });
  });

  describe('When update Order', () => {
    it('Should update a order', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockOrderModel);
      mockRepository.create = jest.fn().mockReturnValue(mockUpdatedOrderModel);
      mockRepository.save = jest.fn().mockReturnValue(mockUpdatedOrderModel);

      const orderUpdated = await service.update(1, mockUpdateOrderParams);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(orderUpdated).toBe(mockUpdatedOrderModel);
    });
  });

  describe('When delete Order', () => {
    it('Should delete a existing order', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockOrderModel);
      const mockOrderModelDeleteable = mockOrderModel;
      delete mockOrderModelDeleteable.products;
      mockRepository.save = jest
        .fn()
        .mockReturnValueOnce(mockOrderModelDeleteable);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).toBeCalledWith(mockOrderModelDeleteable);
      expect(mockRepository.delete).toBeCalledWith(mockOrderModel);
    });

    it('Should return an internal server error if repository does not delete the order', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockOrderModel);
      mockRepository.delete.mockReturnValueOnce(null);

      const deletedOrder = service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).toBeCalledWith(mockOrderModel);
      expect(deletedOrder).rejects.toThrow(InternalServerErrorException);
    });
  });
});
