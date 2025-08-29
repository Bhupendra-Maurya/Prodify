import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/products";

// fetch all products
export const useProducts = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["products", page, search],
    queryFn: () => fetchProducts(limit, (page - 1) * limit, search),
    placeholderData: (previousData) => previousData,
  });
};

// fetch single product

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // runs only if id is provided
  });
};
