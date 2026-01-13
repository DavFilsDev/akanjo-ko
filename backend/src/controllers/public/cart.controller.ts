import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getOrCreateCartService, addItemToCartService } from "../../services/cart.service";

export const getCurrentCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cart = await getOrCreateCartService(user);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cart",
    });
  }
};

export const addItemToCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "productId and valid quantity are required",
      });
    }

    const cart = await addItemToCartService(userId, productId, quantity);

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error: any) {
    console.error("Add to cart error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add item to cart",
    });
  }
};
