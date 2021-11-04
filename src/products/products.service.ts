import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(createProductDto);
    const productSaved = await this.productRepository.save(product);
    if (!productSaved)
      throw new InternalServerErrorException('Problema ao criar cliente');

    return productSaved;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const updated = await this.productRepository.update(product, {
      ...updateProductDto,
    });
    if (!updated) {
      throw new InternalServerErrorException('Problema ao atualizar produto');
    }
    const productUpdated = this.productRepository.create({
      ...product,
      ...updateProductDto,
    });
    return productUpdated;
  }

  async remove(id: number): Promise<boolean> {
    const product = await this.findOne(id);
    const deleted = await this.productRepository.delete(product);
    return !!deleted;
  }
}