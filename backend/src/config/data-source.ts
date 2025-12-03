import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Import des entités
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Discussion } from "../entities/Discussion";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // ⚠️ Pendant le développement SEULEMENT
  synchronize: true,
  dropSchema: true, // 👈 supprime toutes les tables avant de recréer

  logging: false,

  // 👇 Toutes les entités ici
  entities: [
    User,
    Product,
    Order,
    OrderItem,
    Discussion,
  ],
});
