import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    const orderSaved = await this.orderRepository.save(order);
    if (!orderSaved)
      throw new InternalServerErrorException('Problema ao criar cliente');

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
    const orderUpdated = this.orderRepository.create({
      ...order,
      ...updateOrderDto,
    });
    const updated = await this.orderRepository.save(orderUpdated);
    if (!updated) {
      throw new InternalServerErrorException('Problema ao atualizar pedido');
    }
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }
    delete order.products;
    const deleteable = await this.orderRepository.save(order);
    const deleted = await this.orderRepository.delete(deleteable);
    return !!deleted;
  }
}
