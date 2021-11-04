import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Color } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  name: string;

  @IsEnum(Color, { message: 'Esta não é uma cor válida' })
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  color: Color;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  size: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  price: number;
}
