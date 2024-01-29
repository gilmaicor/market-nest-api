import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { mockRepository } from './products.service.spec';
import { mockCreateProductParams, mockProductArrayModel, mockProductModel, mockUpdateProductParams } from '../common/test/mockProducts';

describe('TesteController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When create a Products', () => {
    it('should call the create service', () => {
      service.create = jest.fn().mockReturnValueOnce(mockProductModel);
      controller.create(mockCreateProductParams)
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search all Products', () => {
    it('should call the findAll service', () => {
      service.findAll = jest.fn().mockReturnValueOnce(mockProductArrayModel);
      controller.findAll()
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Product By Id', () => {
    it('should call the findOne service', () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockProductModel);
      controller.findOne('1')
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When update Product', () => {
    it('should call the update service', () => {
      service.update = jest.fn().mockReturnValueOnce(mockProductModel);
      controller.update('1', mockUpdateProductParams)
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('When remove Product', () => {
    it('should call the remove service', () => {
      service.remove = jest.fn().mockReturnValueOnce(true);
      controller.remove('1')
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
