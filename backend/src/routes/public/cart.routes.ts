import { Router } from "express";
import { getCurrentCart } from "../../controllers/public/cart.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { addItemToCart } from "../../controllers/public/cart.controller";

const router = Router();

router.get("/", authMiddleware, getCurrentCart);
router.post("/items", authMiddleware, addItemToCart);

export default router;
