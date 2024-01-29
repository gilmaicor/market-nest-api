import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { mockRepository } from './orders.service.spec';
import { mockCreateOrderParams, mockOrderArrayModel, mockOrderModel, mockUpdateOrderParams } from '../common/test/mockOrders';
import { PdfService } from '../pdf/pdf.service';

describe('TesteController', () => {
  let controller: OrdersController;
  let service: OrdersService;
  let pdfService: PdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        PdfService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
    pdfService = module.get<PdfService>(PdfService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When create a Order', () => {
    it('should call the create service', () => {
      service.create = jest.fn().mockReturnValueOnce(mockOrderModel);
      controller.create(mockCreateOrderParams)
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search all Orders', () => {
    it('should call the findAll service', () => {
      service.findAll = jest.fn().mockReturnValueOnce(mockOrderArrayModel);
      controller.findAll()
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Order By Id', () => {
    it('should call the findOne service', () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockOrderModel);
      controller.findOne('1')
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When update Order', () => {
    it('should call the update service', () => {
      service.update = jest.fn().mockReturnValueOnce(mockOrderModel);
      controller.update('1', mockUpdateOrderParams)
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('When remove Order', () => {
    it('should call the remove service', () => {
      service.remove = jest.fn().mockReturnValueOnce(true);
      controller.remove('1')
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });

  // describe('When generating PDF of the order', () => {
  //   it('should call the generatePDF service', () => {
  //     service.findOne = jest.fn().mockReturnValueOnce(mockOrderModel);
  //     pdfService.generatePDF = jest.fn().mockReturnValueOnce(true);
  //     controller.report('1')
  //     expect(service.findOne).toHaveBeenCalledTimes(1);
  //     expect(pdfService.generatePDF).toHaveBeenCalledTimes(1);
  //   });
  // });
});
