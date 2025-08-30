import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchProductById, createProduct } from "../api/products";
import type { CreateProductData } from "@/types/product";

export const useProducts = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => fetchProducts(limit, (page - 1) * limit, search),
    placeholderData: (previousData) => previousData,
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateProductData> }) => {
      // Only update the cache, no API call
      queryClient.setQueriesData({ queryKey: ["products"] }, (old: any) => {
        if (!old?.products) return old;
        return {
          ...old,
          products: old.products.map((product: any) => 
            product.id === id ? { ...product, ...data } : product
          )
        };
      });
      return Promise.resolve({ id, ...data });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      // Only update the cache, no API call
      queryClient.setQueriesData({ queryKey: ["products"] }, (old: any) => {
        if (!old?.products) return old;
        return {
          ...old,
          products: old.products.filter((product: any) => product.id !== id),
          total: old.total - 1
        };
      });
      return Promise.resolve({ id });
    },
  });
};
