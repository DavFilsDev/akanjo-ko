import { seedUsers } from "./user.seed";
import { seedProducts } from "./product.seed";

export const runSeeds = async () => {
  try {
    await seedUsers();
    await seedProducts();
  } catch (error) {
    console.error("Seeding failed", error);
  }
};
