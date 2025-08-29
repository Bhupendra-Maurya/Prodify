import React from "react";
import { useProducts } from "../../hooks/useProducts";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ProductsList: React.FC = () => {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load products: {(error as Error).message}
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products?.map((product: any) => (
          <Card key={product.id} className="hover:shadow-lg transition">
            <CardHeader>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 w-full object-cover rounded-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
