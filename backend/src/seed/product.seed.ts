import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";

export const seedProducts = async () => {
  const productRepo = AppDataSource.getRepository(Product);

  const products = productRepo.create([
    {
      name: "T-shirt noir",
      description: "T-shirt coton noir",
      price: 20,
      stock: 10,
      category: "vetements",
      gender: "homme",
      age_group: "adulte",
      available: true,
      image_url: "https://example.com/tshirt-noir.jpg",
    },
    {
      name: "Robe rouge",
      description: "Robe été légère",
      price: 35,
      stock: 5,
      category: "vetements",
      gender: "femme",
      age_group: "adulte",
      available: true,
      image_url: "https://example.com/robe-rouge.jpg",
    },
    {
      name: "Basket blanche",
      description: "Sneakers confort",
      price: 50,
      stock: 0,
      category: "chaussures",
      gender: "homme",
      age_group: "adulte",
      available: false,
      image_url: "https://example.com/basket-blanche.jpg",
    },
    {
      name: "Pull enfant",
      description: "Pull chaud laine",
      price: 25,
      stock: 8,
      category: "vetements",
      gender: "homme",
      age_group: "enfant",
      available: true,
      image_url: "https://example.com/pull-enfant.jpg",
    },
  ]);

  await productRepo.save(products);
  console.log("Products seeded");
};
