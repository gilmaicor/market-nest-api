import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  Validate,
} from 'class-validator';
import { Order } from '../../orders/entities/order.entity';
import { Gender } from '../entities/customer.entity';
import { ValidateCpf } from './validators/cpf.validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @Validate(ValidateCpf, {
    message: 'Este não é um CPF válido',
  })
  cpf: string;

  @IsEnum(Gender, { message: 'Este não é um genero válido' })
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  gender: Gender;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  email: string;

  @IsOptional()
  order?: Order;
}
