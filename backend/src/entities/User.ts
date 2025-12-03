import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Order } from "./Order";
import { Discussion } from "./Discussion";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "user" })
  role!: "user" | "admin";

  @CreateDateColumn()
  created_at!: Date;

  // Relations
  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Discussion, (discussion) => discussion.user)
  discussions!: Discussion[];
}
