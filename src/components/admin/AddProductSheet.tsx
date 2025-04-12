
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import ProductForm from "@/components/admin/ProductForm";

const AddProductSheet = () => {
  return (
    <Sheet>
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
          <ProductForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductSheet;
