import { Request, Response } from "express";
import { createProductService } from "../../services/admin/product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      category,
      gender,
      age_group,
      available,
      description,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const product = await createProductService({
      name,
      price,
      category,
      gender,
      age_group,
      available,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};
