import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint()
export class ValidateCpf implements ValidatorConstraintInterface {
  validate(text: string) {
    return cpf.isValid(text);
  }
}
