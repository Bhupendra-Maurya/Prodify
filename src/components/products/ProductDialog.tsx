import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { toast } from "sonner";
import type { Product } from "@/types/product";

interface ProductDialogProps {
  product?: Product;
  trigger: React.ReactNode;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ product, trigger }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    category: "",
    stock: 0,
    description: "",
  });

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateMutation.mutate({ id: product.id, data: formData }, {
        onSuccess: () => {
          setOpen(false);
          toast.success("Product updated successfully!");
        },
        onError: (error) => {
          toast.error(`Failed to update product: ${error.message}`);
        },
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setOpen(false);
          setFormData({ title: "", price: 0, category: "", stock: 0, description: "" });
          toast.success("Product created successfully!");
        },
        onError: (error) => {
          toast.error(`Failed to create product: ${error.message}`);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            required
          />
          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {product ? "Update" : "Create"} Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;