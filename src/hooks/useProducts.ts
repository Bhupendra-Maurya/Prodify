import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/products";
import type { CreateProductData } from "@/types/product";

export const useProducts = (page = 1, limit = 10, search = "", category = "all") => {
  return useQuery({
    queryKey: ["products", page, limit, search,category],
    queryFn: () => fetchProducts(limit, (page - 1) * limit, search,category),
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
    mutationFn: (productData: CreateProductData) => {
      // Generate a temporary ID for the new product
      const newProduct = {
        id: Date.now(), 
        ...productData,
        thumbnail: "https://placehold.co/600x400", 
      };
      
      // Add to cache at the beginning of the list
      queryClient.setQueriesData({ queryKey: ["products"] }, (old: any) => {
        if (!old?.products) return old;
        return {
          ...old,
          products: [newProduct, ...old.products],
          total: old.total + 1
        };
      });
      
      return Promise.resolve(newProduct);
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
