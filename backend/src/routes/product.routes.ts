import { Router } from "express";
import { getProducts } from "../controllers/public/product.controller";

const router = Router();

router.get("/", getProducts);

export default router;
