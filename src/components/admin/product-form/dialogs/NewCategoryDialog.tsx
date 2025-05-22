
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { createSlug, addCategory } from '../utils/categoryUtils';

interface NewCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdded: (category: { id: string; name: string }) => void;
}

const NewCategoryDialog = ({ open, onOpenChange, onCategoryAdded }: NewCategoryDialogProps) => {
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  
  const handleCategoryNameChange = (name: string) => {
    setNewCategory({
      ...newCategory,
      name,
      slug: createSlug(name)
    });
  };
  
  const handleAddCategory = async () => {
    const result = await addCategory(newCategory.name, newCategory.slug);
    if (result) {
      onCategoryAdded({ id: result.id, name: result.name });
      setNewCategory({ name: '', slug: '' });
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new product category. Categories help organize products and improve SEO.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <FormLabel>Category Name</FormLabel>
            <Input 
              value={newCategory.name} 
              onChange={(e) => handleCategoryNameChange(e.target.value)}
              placeholder="e.g., Homeopathic Kits" 
            />
          </div>
          
          <div className="space-y-2">
            <FormLabel>Slug (URL-friendly name)</FormLabel>
            <Input 
              value={newCategory.slug} 
              onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
              placeholder="e.g., homeopathic-kits"
            />
            <p className="text-xs text-muted-foreground">
              Auto-generated from name, but you can customize it.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryDialog;
