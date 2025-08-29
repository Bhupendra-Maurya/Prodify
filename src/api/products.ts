import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};


