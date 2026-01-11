import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.patch("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export default router;
