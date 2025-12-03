import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("float")
  total!: number;

  @Column()
  status!: string; // pending, completed...

  @CreateDateColumn()
  created_at!: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items!: OrderItem[];
}
