import { Router } from "express";
import {
  createProduct,
  updateProduct,
} from "../../controllers/admin/product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.patch("/:id", authMiddleware, isAdmin, updateProduct);

export default router;
