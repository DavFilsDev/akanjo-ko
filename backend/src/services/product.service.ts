import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";

interface ProductFilters {
  category?: string;
  gender?: string;
  age_group?: string;
  available?: boolean;
}

export const getAllProducts = async (filters: ProductFilters) => {
  const productRepo = AppDataSource.getRepository(Product);

  const query = productRepo.createQueryBuilder("product");

  if (filters.category) {
    query.andWhere("product.category = :category", {
      category: filters.category,
    });
  }

  if (filters.gender) {
    query.andWhere("product.gender = :gender", {
      gender: filters.gender,
    });
  }

  if (filters.age_group) {
    query.andWhere("product.age_group = :age_group", {
      age_group: filters.age_group,
    });
  }

  if (filters.available !== undefined) {
    query.andWhere("product.available = :available", {
      available: filters.available,
    });
  }

  query.orderBy("product.created_at", "DESC");

  return await query.getMany();
};
