import { AppDataSource } from "../../config/data-source";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";
import { OrderItem } from "../../entities/OrderItem";
import { Product } from "../../entities/Product";

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

export const addItemToCartService = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  const productRepo = AppDataSource.getRepository(Product);
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const product = await productRepo.findOneBy({ id: productId });
  if (!product) throw new Error("Product not found");

  if (!product.available || product.stock <= 0) {
    throw new Error("Product not available");
  }

  let cart = await orderRepo.findOne({
    where: { user: { id: userId }, status: "cart" },
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

  let item = cart.items.find(
    (i) => i.product.id === productId
  );

  if (item) {
    item.quantity += quantity;
    await orderItemRepo.save(item);
  } else {
    item = orderItemRepo.create({
      order: cart,
      product,
      quantity,
      price: product.price,
    });
    await orderItemRepo.save(item);
    cart.items.push(item);
  }

  // recalcul total
  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  await orderRepo.save(cart);

  return cart;
};

export const removeCartItemService = async (
  userId: number,
  itemId: number
) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const itemRepo = AppDataSource.getRepository(OrderItem);

  // Trouver le panier actif
  const cart = await orderRepo.findOne({
    where: {
      user: { id: userId },
      status: "cart",
    },
    relations: ["items", "items.product"],
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  // Trouver l’item
  const item = cart.items.find((i) => i.id === itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  // Supprimer l’item
  await itemRepo.remove(item);

  // Recalculer le total
  cart.items = cart.items.filter((i) => i.id !== itemId);

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  // Sauvegarder le panier
  await orderRepo.save(cart);

  return cart;
};

export const updateCartItemQuantityService = async (
  userId: number,
  itemId: number,
  quantity: number
) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const itemRepo = AppDataSource.getRepository(OrderItem);

  const cart = await orderRepo.findOne({
    where: {
      user: { id: userId },
      status: "cart",
    },
    relations: ["items", "items.product"],
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((i) => i.id === itemId);

  if (!item) {
    throw new Error("Item not found in cart");
  }

  // si quantité <= 0 → supprimer l’item
  if (quantity <= 0) {
    await itemRepo.remove(item);
  } else {
    item.quantity = quantity;
    await itemRepo.save(item);
  }

  // Recalcul du total
  const updatedItems = await itemRepo.find({
    where: { order: { id: cart.id } },
    relations: ["product"],
  });

  cart.total = updatedItems.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  await orderRepo.save(cart);

  return {
    ...cart,
    items: updatedItems,
  };
};

export const clearCart = async (userId: number) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const itemRepo = AppDataSource.getRepository(OrderItem);

  // Find active cart
  const cart = await orderRepo.findOne({
    where: {
      user: { id: userId },
      status: "cart",
    },
    relations: ["items"],
  });

  if (!cart) {
    return; // idempotent: cart already empty
  }

  // Remove all items
  await itemRepo.remove(cart.items);

  // Reset total
  cart.total = 0;
  cart.items = [];

  await orderRepo.save(cart);
};
