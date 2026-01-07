import { seedProducts } from "./product.seed";

export const runSeeds = async () => {
  try {
    await seedProducts();

  } catch (error) {
    console.error("Seeding failed", error);
  }
};