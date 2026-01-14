import { Router } from "express";
import { getCurrentCart, addItemToCart, removeCartItem } from "../../controllers/public/cart.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getCurrentCart);
router.post("/items", authMiddleware, addItemToCart);
router.delete("/items/:id", authMiddleware, removeCartItem);

export default router;
