import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    const orderSaved = await this.orderRepository.save(order);
    if (!orderSaved)
      throw new InternalServerErrorException('Falha ao criar Pedido.');

    return orderSaved;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['customer', 'products'],
      loadEagerRelations: true,
    });
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: ['customer', 'products'],
      loadEagerRelations: true,
    });
    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const product = await this.findOne(id);
    const updated = await this.orderRepository.update(product.id, {
      ...updateOrderDto,
    });
    if (!updated) {
      throw new InternalServerErrorException('Falha ao atualizar Pedido.');
    }
    const orderUpdated = this.orderRepository.create({
      ...product,
      ...updateOrderDto,
    });
    return orderUpdated;
  }

  async remove(id: number): Promise<boolean> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Pedido não encontrado ou já foi excluido.');
    }
    delete order.products;
    const deleteable = await this.orderRepository.save(order);
    const deleted = await this.orderRepository.delete(deleteable.id);
    return !!deleted;
  }
}
