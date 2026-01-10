import { Request, Response } from "express";
import { updateProductService, createProductService } from "../../services/admin/product.service";

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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const data = req.body;

    const updatedProduct = await updateProductService(productId, data);

    return res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error("Update product error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};
