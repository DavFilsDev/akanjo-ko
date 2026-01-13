import { Request, Response } from "express";
import { getAllProducts } from "../../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, gender, age_group, available } = req.query;

    const products = await getAllProducts({
      category: category as string | undefined,
      gender: gender as string | undefined,
      age_group: age_group as string | undefined,
      available:
        available !== undefined ? available === "true" : undefined,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
