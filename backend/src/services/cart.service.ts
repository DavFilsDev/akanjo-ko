import { AppDataSource } from "../config/data-source";
import { Order } from "../entities/Order";
import { User } from "../entities/User";

export const getOrCreateCartService = async (user: User) => {
  const orderRepo = AppDataSource.getRepository(Order);

  let cart = await orderRepo.findOne({
    where: {
      user: { id: user.id },
      status: "cart",
    },
    relations: ["items", "items.product"],
  });

  if (!cart) {
    cart = orderRepo.create({
      user,
      status: "cart",
      total: 0,
      items: [],
    });

    await orderRepo.save(cart);
  }

  return cart;
};
