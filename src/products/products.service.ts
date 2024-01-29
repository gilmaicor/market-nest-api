import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    const productSaved = await this.productRepository.save(product);
    if (!productSaved)
      throw new InternalServerErrorException('Falha ao criar Produto.');

    return productSaved;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const productUpdated = this.productRepository.create({
      ...product,
      ...updateProductDto,
    });
    const updated = await this.productRepository.update(product.id, {
      ...productUpdated,
    });
    if (!updated) {
      throw new InternalServerErrorException('Falha ao atualizar Produto.');
    }
    return productUpdated;
  }

  async remove(id: number): Promise<boolean> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado ou já foi excluido.');
    }
    const deleted = await this.productRepository.delete(product.id);
    return !!deleted;
  }
}
