import { IsNotEmpty, IsString, IsEnum, Validate } from 'class-validator';
import { randomBytes } from 'crypto';
import { Gender } from '../entities/customer.entity';
import { ValidateCpf } from './validators/cpf.validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  code: string = randomBytes(3).toString('hex');

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
}
