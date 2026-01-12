import { Router } from "express";
import { getCurrentCart } from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getCurrentCart);

export default router;
