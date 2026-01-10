import { AppDataSource } from "../../config/data-source";
import { Product } from "../../entities/Product";

interface CreateProductDTO {
  name: string;
  price: number;
  category: string;
  gender?: string;
  age_group?: string;
  available?: boolean;
  description?: string;
}

export const createProductService = async (data: CreateProductDTO) => {
  const productRepo = AppDataSource.getRepository(Product);

  const product = productRepo.create({
    name: data.name,
    price: data.price,
    category: data.category,
    gender: data.gender,
    age_group: data.age_group,
    available: data.available ?? true,
    description: data.description,
  });

  return await productRepo.save(product);
};

export const updateProductService = async (
  productId: number,
  data: Partial<Product>
) => {
  const productRepo = AppDataSource.getRepository(Product);

  const product = await productRepo.findOneBy({ id: productId });

  if (!product) {
    throw new Error("Product not found");
  }

  Object.assign(product, data);

  if (data.stock !== undefined) {
    product.available = data.stock > 0;
  }

  return await productRepo.save(product);
};
