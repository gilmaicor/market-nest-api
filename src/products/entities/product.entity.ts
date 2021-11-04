import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { randomBytes } from 'crypto';

export enum Color {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
  YELLOW = 'yellow',
  PINK = 'pink',
  ORANGE = 'orange',
  PURPLE = 'purple',
  UNDEFINED = 'undefined',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: Color,
    default: Color.UNDEFINED,
  })
  color: Color;

  @Column()
  size: number;

  @Column()
  price: number;

  @BeforeInsert()
  beforeInsertActions() {
    this.code = randomBytes(3).toString('hex');
  }
}
