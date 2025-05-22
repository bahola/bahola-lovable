
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Layers } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import NewCategoryDialog from '../dialogs/NewCategoryDialog';
import NewSubcategoryDialog from '../dialogs/NewSubcategoryDialog';

interface CategorySectionProps {
  form: UseFormReturn<any>;
}

const CategorySection = ({ form }: CategorySectionProps) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const [newSubcategoryDialogOpen, setNewSubcategoryDialogOpen] = useState(false);
  
  // Get the selected category from form state
  const selectedCategory = form.watch("category");

  // Fetch all categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('id, name');
          
        if (error) {
          throw error;
        }
        
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        return;
      }
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('product_subcategories')
          .select('id, name')
          .eq('category_id', selectedCategory);
          
        if (error) {
          throw error;
        }
        
        setSubcategories(data || []);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubcategories();
  }, [selectedCategory]);

  // Handle new category added
  const handleCategoryAdded = (category: { id: string; name: string }) => {
    setCategories([...categories, category]);
    form.setValue("category", category.id);
    form.setValue("subcategory", ""); // Reset subcategory when category changes
  };

  // Handle new subcategory added
  const handleSubcategoryAdded = (subcategory: { id: string; name: string }) => {
    setSubcategories([...subcategories, subcategory]);
    form.setValue("subcategory", subcategory.id);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="flex items-center">
                <Layers className="h-4 w-4 mr-1" /> 
                Category
              </span>
            </FormLabel>
            <div className="flex gap-2">
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset subcategory when category changes
                  form.setValue("subcategory", "");
                }} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => setNewCategoryDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <FormDescription>
              Select a category for your product or create a new one.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="flex items-center">
                <Layers className="h-4 w-4 mr-1" /> 
                Subcategory
              </span>
            </FormLabel>
            <div className="flex gap-2">
              <Select 
                onValueChange={field.onChange} 
                value={field.value || ""}
                disabled={!selectedCategory || loading}
              >
                <FormControl>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={loading ? "Loading..." : !selectedCategory ? "Select a category first" : "Select a subcategory"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => setNewSubcategoryDialogOpen(true)}
                disabled={!selectedCategory}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <FormDescription>
              Select a subcategory for your product or create a new one.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Add New Category Dialog */}
      <NewCategoryDialog 
        open={newCategoryDialogOpen} 
        onOpenChange={setNewCategoryDialogOpen}
        onCategoryAdded={handleCategoryAdded}
      />
      
      {/* Add New Subcategory Dialog */}
      <NewSubcategoryDialog 
        open={newSubcategoryDialogOpen} 
        onOpenChange={setNewSubcategoryDialogOpen}
        selectedCategory={selectedCategory}
        categoryName={categories.find(c => c.id === selectedCategory)?.name || ''}
        onSubcategoryAdded={handleSubcategoryAdded}
      />
    </>
  );
};

export default CategorySection;
