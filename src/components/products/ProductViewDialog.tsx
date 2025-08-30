import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/product";

interface ProductViewDialogProps {
  product: Product;
  trigger: React.ReactNode;
}

const ProductViewDialog: React.FC<ProductViewDialogProps> = ({
  product,
  trigger,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-md object-contain max-h-80"
            />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
            <CardDescription className="mb-4">
              {product.description}
            </CardDescription>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;
