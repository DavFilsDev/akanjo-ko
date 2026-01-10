import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";

export const seedUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);

  const passwordHash = await bcrypt.hash("password123", 10);

  const users = userRepo.create([
    {
      name: "John User",
      email: "user1@test.com",
      password: passwordHash,
      role: "user",
    },
    {
      name: "Jane User",
      email: "user2@test.com",
      password: passwordHash,
      role: "user",
    },
    {
      name: "Admin One",
      email: "admin1@test.com",
      password: passwordHash,
      role: "admin",
    },
    {
      name: "Admin Two",
      email: "admin2@test.com",
      password: passwordHash,
      role: "admin",
    },
  ]);

  await userRepo.save(users);
  console.log("Users & admins seeded");
};
