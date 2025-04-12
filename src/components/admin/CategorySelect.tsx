
import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Initial categories - in a real app, these would come from a database
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export const initialCategories: Category[] = [
  { id: '1', name: 'Homeopathic Pills', slug: 'homeopathic-pills', description: 'Standard homeopathic pellets and pills' },
  { id: '2', name: 'Homeopathic Drops', slug: 'homeopathic-drops', description: 'Liquid homeopathic remedies' },
  { id: '3', name: 'Mother Tinctures', slug: 'mother-tinctures', description: 'Concentrated homeopathic preparations' },
  { id: '4', name: 'Biochemic Remedies', slug: 'biochemic-remedies', description: 'Cell salt remedies' },
  { id: '5', name: 'Homeopathic Creams', slug: 'homeopathic-creams', description: 'Topical applications' },
  { id: '6', name: 'Specialty Combinations', slug: 'specialty-combinations', description: 'Custom blended remedies' },
];

interface CategorySelectProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySelect = ({ selectedCategory, onCategoryChange }: CategorySelectProps) => {
  const [open, setOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const selectedCategoryName = categories.find(category => category.id === selectedCategory)?.name || "Select category";

  const handleAddCategory = () => {
    if (newCategory.name.trim() === '') {
      toast.error("Category name is required");
      return;
    }

    // Generate a slug from the name
    const slug = newCategory.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create a new category object
    const newCategoryItem: Category = {
      id: Date.now().toString(), // Simple ID generation for demo purposes
      name: newCategory.name,
      slug: slug,
      description: newCategory.description
    };

    // Add new category to the list
    setCategories([...categories, newCategoryItem]);
    
    // Clear form and close dialog
    setNewCategory({ name: '', description: '' });
    setAddDialogOpen(false);
    
    // Select the newly created category
    onCategoryChange(newCategoryItem.id);
    
    toast.success(`Category "${newCategory.name}" added successfully`);
  };

  return (
    <div className="flex flex-col space-y-1 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {selectedCategoryName}
            <Check className={cn(
              "ml-2 h-4 w-4",
              selectedCategory ? "opacity-100" : "opacity-0"
            )} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]" align="start">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandEmpty>
              <div className="py-6 text-center text-sm">
                <p>No category found.</p>
              </div>
            </CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    onCategoryChange(category.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{category.name}</span>
                    {category.description && (
                      <span className="text-xs text-muted-foreground">{category.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <div className="p-2 border-t">
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new product category. Categories help organize your products
                      and improve SEO discoverability.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Input
                        id="name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        placeholder="e.g., Homeopathic Kits"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (optional)</Label>
                      <Input
                        id="description"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                        placeholder="A short description of the category"
                      />
                      <p className="text-xs text-muted-foreground">
                        Good descriptions improve SEO performance and help customers find products.
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory}>
                      Add Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategorySelect;
