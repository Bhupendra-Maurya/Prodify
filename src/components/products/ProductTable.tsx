import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import ProductDialog from "./ProductDialog";
import ProductViewDialog from "./ProductViewDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error } = useProducts(
    page,
    limit,
    debouncedSearch,
    category
  );

  useEffect(() => {
    if (isError) {
      toast.error(`Failed to load products: ${(error as Error).message}`);
    }
  }, [isError, error]);

  //   if (isError) {
  //   return (
  //     <Alert variant="destructive">
  //       <AlertDescription>
  //         Failed to load products: {(error as Error).message}
  //       </AlertDescription>
  //     </Alert>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-80" />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-40" />
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Products</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="smartphones">Smartphones</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="fragrances">Fragrances</SelectItem>
              <SelectItem value="skincare">Skincare</SelectItem>
            </SelectContent>
          </Select>

          <ProductDialog trigger={<Button className="w-full sm:w-auto">Add Product</Button>} />
        </div>
      </div>

      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:max-w-sm"
      />

      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-gray-400 text-4xl">📦</div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {debouncedSearch
                        ? "No search results"
                        : "No products found"}
                    </h3>
                    <p className="text-gray-500">
                      {debouncedSearch
                        ? `No products match "${debouncedSearch}". Try a different search term.`
                        : "Get started by adding your first product."}
                    </p>
                    {debouncedSearch && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearch("")}
                        className="mt-2"
                      >
                        Clear search
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.products?.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <ProductViewDialog
                        product={product}
                        trigger={
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            View
                          </Button>
                        }
                      />
                      <ProductDialog
                        product={product}
                        trigger={
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            Edit
                          </Button>
                        }
                      />
                      <DeleteProductDialog
                        productId={product.id}
                        productName={product.title}
                        trigger={
                          <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                            Delete
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-500 text-center sm:text-left">
          Showing {data?.products?.length || 0} of {data?.total || 0} products
        </div>
        <div className="flex justify-center sm:justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex-1 sm:flex-none"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={!data?.products?.length || data.products.length < limit}
            className="flex-1 sm:flex-none"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
