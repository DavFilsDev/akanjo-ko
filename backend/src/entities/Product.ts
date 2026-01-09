import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { Discussion } from "./Discussion";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("float")
  price!: number;

  @Column("int", { default: 0 })
  stock!: number;

  @Column()
  category!: string;

  @Column()
  gender!: string;

  @Column()
  age_group!: string;

  @Column({ default: true })
  available!: boolean;

  @Column({ nullable: true })
  image_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items!: OrderItem[];

  @OneToMany(() => Discussion, (discussion) => discussion.product)
  discussions!: Discussion[];
}
