import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import {
  mockAddAccountParams,
  mockUpdateProductParams,
  mockUpdatedProductModel,
  mockProductModel,
  mockProductArrayModel,
} from './../common/test/mockProducts';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockProductArrayModel),
    findOne: jest.fn().mockReturnValue(mockProductModel),
    create: jest.fn().mockReturnValue(mockProductModel),
    save: jest.fn().mockReturnValue(mockProductModel),
    update: jest.fn().mockReturnValue(mockUpdatedProductModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all Products', () => {
    it('Should list all products', async () => {
      const products = service.findAll();

      expect(products).resolves.toBe(mockProductArrayModel);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Product By Id', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should find a existing product', async () => {
      const productFound = service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockProductModel.id },
      });
      expect(productFound).resolves.toBe(mockProductModel);
    });

    it('Should return a exception when does not to find a product', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const product = service.findOne(3);

      await expect(product).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 3 },
      });
    });
  });

  describe('When create a product', () => {
    it('Should create a product', async () => {
      const product = await service.create(mockAddAccountParams);

      expect(mockRepository.create).toHaveBeenCalledWith(mockAddAccountParams);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(product).toBe(mockProductModel);
    });
  });

  describe('When update Product', () => {
    it('Should update a product', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockProductModel);
      mockRepository.create = jest
        .fn()
        .mockReturnValue(mockUpdatedProductModel);

      const productUpdated = await service.update(1, mockUpdateProductParams);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(productUpdated).toBe(mockUpdatedProductModel);
    });
  });

  describe('When delete Product', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should delete a existing product', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockProductModel);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(mockProductModel.id);
    });

    it('Should return an internal server error if repository does not delete the product', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(null);

      const deletedProduct = service.remove(1);

      await expect(deletedProduct).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
