import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

interface DeleteProductDialogProps {
  productId: number;
  productName: string;
  trigger: React.ReactNode;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({ productId, productName, trigger }) => {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteProduct();

  const handleDelete = () => {
    deleteMutation.mutate(productId, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Product deleted successfully!");
      },
      onError: (error) => {
        toast.error(`Failed to delete product: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{productName}"? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;