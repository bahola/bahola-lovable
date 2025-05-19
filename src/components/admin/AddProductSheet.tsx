
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import ProductForm from "@/components/admin/ProductForm";

interface AddProductSheetProps {
  onProductAdded?: (product?: any) => void;
}

const AddProductSheet = ({ onProductAdded }: AddProductSheetProps) => {
  const [open, setOpen] = React.useState(false);

  const handleProductAdded = (product?: any) => {
    if (onProductAdded) {
      onProductAdded(product);
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[900px] sm:max-w-[900px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>Create a new product in your inventory.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <ProductForm onProductAdded={handleProductAdded} />
          <SheetClose className="hidden" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductSheet;
