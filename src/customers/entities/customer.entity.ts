import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { randomBytes } from 'crypto';
import { Order } from '../../orders/entities/order.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ readonly: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  cpf: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({ length: 100 })
  email: string;

  @OneToOne((type) => Order)
  order?: Order;

  @BeforeInsert()
  beforeInsertActions() {
    this.code = randomBytes(3).toString('hex');
  }
}
