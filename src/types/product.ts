export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductData {
  title: string;
  price: number;
  category: string;
  stock: number;
  description: string;
}