import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int")
  quantity!: number;

  @Column("float")
  price!: number;

  // Relations
  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.order_items, {
    onDelete: "CASCADE",
  })
  product!: Product;
}
