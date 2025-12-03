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

  @Column("int")
  stock!: number;

  @Column()
  category!: string;

  @Column()
  gender!: string; // homme / femme

  @Column()
  age_group!: string; // adulte / enfant

  @Column({ default: true })
  available!: boolean;

  @Column({ nullable: true })
  image_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  // Relations
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items!: OrderItem[];

  @OneToMany(() => Discussion, (discussion) => discussion.product)
  discussions!: Discussion[];
}
