import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { randomBytes } from 'crypto';
import { Customer } from '../../customers/entities/customer.entity';
import { Product } from '../../products/entities/product.entity';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  CHECK = 'check',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ readonly: true })
  code: string;

  @Column()
  date: Date;

  @Column({ length: 255 })
  note: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: PaymentMethod;

  @OneToOne((type) => Customer)
  @JoinColumn()
  customer: Customer;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @BeforeInsert()
  beforeInsertActions() {
    this.code = randomBytes(3).toString('hex');
  }
}
