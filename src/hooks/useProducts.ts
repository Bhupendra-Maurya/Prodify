import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/products";

// fetch all products
export const useProcucts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

// fetch single product

export const useProduct=(id:number)=>{
    return useQuery({
        queryKey:["product",id],
        queryFn:()=>fetchProductById(id),
        enabled:!!id // runs only if id is provided
    })
}