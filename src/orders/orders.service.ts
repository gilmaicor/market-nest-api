import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create(createOrderDto);
    const orderSaved = await this.orderRepository.save(order);
    if (!orderSaved)
      throw new InternalServerErrorException('Problema ao criar cliente');

    return orderSaved;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id, {
      relations: ['customer', 'products'],
      loadEagerRelations: true,
    });
    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const updated = await this.orderRepository.update(order, {
      ...updateOrderDto,
    });
    if (!updated) {
      throw new InternalServerErrorException('Problema ao atualizar pedido');
    }
    const orderUpdated = this.orderRepository.create({
      ...order,
      ...updateOrderDto,
    });
    return orderUpdated;
  }

  async remove(id: number): Promise<boolean> {
    const order = await this.findOne(id);
    const deleted = await this.orderRepository.delete(order);
    return !!deleted;
  }
}
