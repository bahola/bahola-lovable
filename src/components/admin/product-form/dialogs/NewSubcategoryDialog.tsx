
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { createSlug, addSubcategory } from '../utils/categoryUtils';

interface NewSubcategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string;
  categoryName: string;
  onSubcategoryAdded: (subcategory: { id: string; name: string }) => void;
}

const NewSubcategoryDialog = ({ 
  open, 
  onOpenChange, 
  selectedCategory, 
  categoryName, 
  onSubcategoryAdded 
}: NewSubcategoryDialogProps) => {
  const [newSubcategory, setNewSubcategory] = useState({ name: '', slug: '' });
  
  const handleSubcategoryNameChange = (name: string) => {
    setNewSubcategory({
      ...newSubcategory,
      name,
      slug: createSlug(name)
    });
  };
  
  const handleAddSubcategory = async () => {
    const result = await addSubcategory(newSubcategory.name, newSubcategory.slug, selectedCategory);
    if (result) {
      onSubcategoryAdded({ id: result.id, name: result.name });
      setNewSubcategory({ name: '', slug: '' });
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subcategory</DialogTitle>
          <DialogDescription>
            Create a new subcategory within the selected category.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <FormLabel>Parent Category</FormLabel>
            <Input value={categoryName} disabled />
          </div>
          
          <div className="space-y-2">
            <FormLabel>Subcategory Name</FormLabel>
            <Input 
              value={newSubcategory.name} 
              onChange={(e) => handleSubcategoryNameChange(e.target.value)}
              placeholder="e.g., Travel Kits" 
            />
          </div>
          
          <div className="space-y-2">
            <FormLabel>Slug (URL-friendly name)</FormLabel>
            <Input 
              value={newSubcategory.slug} 
              onChange={(e) => setNewSubcategory({...newSubcategory, slug: e.target.value})}
              placeholder="e.g., travel-kits"
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
          <Button onClick={handleAddSubcategory}>
            Add Subcategory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSubcategoryDialog;
