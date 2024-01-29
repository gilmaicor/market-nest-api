import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product, Color } from './../../products/entities/product.entity';

export const mockCreateProductParams: CreateProductDto = {
  name: 'Test Product 1',
  color: Color.UNDEFINED,
  size: 10,
  price: 10,
};

export const mockUpdateProductParams: UpdateProductDto = {
  price: 11,
};

export const mockProductModel: Product = {
  id: 1,
  ...mockCreateProductParams,
  code: '123abc',
  beforeInsertActions: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const mockUpdatedProductModel: Product = {
  ...mockProductModel,
  price: 11,
  beforeInsertActions: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const mockProductArrayModel: Product[] = [
  mockProductModel,
  {
    id: 2,
    code: '456cde',
    name: 'Test Product 2',
    color: Color.UNDEFINED,
    size: 10.6,
    price: 11,
    beforeInsertActions: function (): void {
      throw new Error('Function not implemented.');
    },
  },
  {
    id: 3,
    code: '789fgh',
    name: 'Test Product 3',
    color: Color.UNDEFINED,
    size: 12,
    price: 23.3,
    beforeInsertActions: function (): void {
      throw new Error('Function not implemented.');
    },
  },
];
