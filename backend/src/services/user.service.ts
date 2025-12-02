import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const UserService = {
  async getAll() {
    return await userRepo.find();
  },
};
