import { Router } from "express";
import { createProduct } from "../../controllers/admin/product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

router.post("/", authMiddleware, isAdmin, createProduct);

export default router;

