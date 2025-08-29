import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (limit=10,skip=0,search="") => {
  const response = await apiClient.get(`/products?limit=${limit}&skip=${skip}&q=${search}`);
  return response.data;
};

export const fetchProductById = async (id: number) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};


