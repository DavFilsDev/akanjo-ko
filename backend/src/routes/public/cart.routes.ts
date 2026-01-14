import { Router } from "express";
import { getCurrentCart, addItemToCart, removeCartItem, updateCartItemQuantity, clearCartController,checkoutController } from "../../controllers/public/cart.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getCurrentCart);
router.post("/items", authMiddleware, addItemToCart);
router.delete("/items/:id", authMiddleware, removeCartItem);
router.patch("/items/:id", authMiddleware, updateCartItemQuantity);
router.delete("/", authMiddleware, clearCartController);
router.post("/checkout", authMiddleware, checkoutController);

export default router;
