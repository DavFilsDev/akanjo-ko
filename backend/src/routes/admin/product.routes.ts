import { Router } from "express";
import { createProduct } from "../../controllers/admin/product.controller";

const router = Router();

router.post("/", createProduct);

export default router;
