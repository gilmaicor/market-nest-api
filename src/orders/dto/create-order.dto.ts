import { IsNotEmpty, IsString, IsEnum, IsDateString } from 'class-validator';
import { Customer } from '../../customers/entities/customer.entity';
import { Product } from '../../products/entities/product.entity';
import { PaymentMethod } from '../entities/order.entity';

export class CreateOrderDto {
  @IsDateString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  date: Date;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  note: string;

  @IsEnum(PaymentMethod, {
    message: 'Esta não é uma forma de pagamento válida',
  })
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  paymentMethod: PaymentMethod;

  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  products: Product[];

  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  customer: Customer;
}
