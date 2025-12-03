import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  message!: string;

  @Column()
  sender!: "user" | "admin";

  @CreateDateColumn()
  created_at!: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.discussions, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Product, (product) => product.discussions, {
    onDelete: "CASCADE",
  })
  product!: Product;
}
