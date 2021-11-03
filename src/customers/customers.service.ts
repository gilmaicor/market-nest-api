import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.create(createCustomerDto);
    const customerSaved = await this.customerRepository.save(customer);
    if (!customerSaved)
      throw new InternalServerErrorException('Problema ao criar cliente');

    return customerSaved;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerRepository.find();
    return customers;
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    const updated = await this.customerRepository.update(customer, {
      ...updateCustomerDto,
    });
    if (!updated) {
      throw new InternalServerErrorException('Problema ao atualizar cliente');
    }
    const customerUpdated = this.customerRepository.create({
      ...customer,
      ...updateCustomerDto,
    });
    return customerUpdated;
  }

  async remove(id: number): Promise<boolean> {
    const customer = await this.findOne(id);
    const deleted = await this.customerRepository.delete(customer);
    return !!deleted;
  }
}
