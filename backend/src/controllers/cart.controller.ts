import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getOrCreateCartService } from "../services/cart.service";

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
