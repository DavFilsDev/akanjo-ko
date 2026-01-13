import express from "express";
import authRoutes from "./routes/auth/auth.routes";
import productRoutes from "./routes/public/product.routes";
import adminProductRoutes from "./routes/admin/product.routes";
import cartRoutes from "./routes/public/cart.routes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/cart", cartRoutes);

export default app;