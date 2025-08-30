import React, { use, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ProductsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useProducts(page, 10, search);

  <Input
    type="text"
    placeholder="Search products"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded w-full mb-4"
  />;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-40 w-full rounded-md" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Failed to load products</AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      {/* Search */}
      <Input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset page when search changes
        }}
        className="border p-2 rounded w-full mb-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data?.products?.map((product: any) => (
          <Card
            key={product.id}
            className="hover:shadow-lg transition  cursor-pointer"
          >
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
              <p className="text-green-600 font-bold mt-2">Stock: {product.stock}</p>
              <Link to={`/products/${product.id}`}>
                <Button className="w-full bg-gray-600 text-white  cursor-pointer">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          disabled={(data?.total ?? 0) <= page * 10}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductsList;
