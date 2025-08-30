import type { CreateProductData, ProductsResponse } from "@/types/product";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (limit = 10, skip = 0, search = ""): Promise<ProductsResponse> => {
  if (search) {
    const response = await apiClient.get(`/products/search?q=${search}&limit=${limit}&skip=${skip}`);
    return response.data;
  }
  const response = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: CreateProductData) => {
  const response = await apiClient.post("/products/add", productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: Partial<CreateProductData>) => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

