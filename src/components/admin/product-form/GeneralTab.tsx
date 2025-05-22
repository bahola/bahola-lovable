import React, { useEffect, useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Hash, Layers, FileText, Plus } from 'lucide-react';
import { initialCategories } from '../CategorySelect';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GeneralTabProps {
  form: UseFormReturn<any>;
}

const GeneralTab = ({ form }: GeneralTabProps) => {
  const [subcategories, setSubcategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedCategory = form.watch("category");
  
  // States for dialogs
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const [newSubcategoryDialogOpen, setNewSubcategoryDialogOpen] = useState(false);
  
  // States for form inputs
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [newSubcategory, setNewSubcategory] = useState({ name: '', slug: '' });
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  
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

  // Function to create a slug from a name
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Handle new category creation
  const handleAddCategory = async () => {
    if (newCategory.name.trim() === '') {
      toast.error("Category name is required");
      return;
    }

    const slug = newCategory.slug || createSlug(newCategory.name);
    
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .insert([
          { 
            name: newCategory.name.trim(),
            slug: slug,
            type: 'product' // Default type
          }
        ])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data[0]) {
        toast.success(`Category "${newCategory.name}" added successfully`);
        
        // Update categories list
        setCategories([...categories, { id: data[0].id, name: data[0].name }]);
        
        // Select the new category
        form.setValue("category", data[0].id);
        
        // Reset form and close dialog
        setNewCategory({ name: '', slug: '' });
        setNewCategoryDialogOpen(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error(`Failed to add category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Handle new subcategory creation
  const handleAddSubcategory = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category first");
      return;
    }
    
    if (newSubcategory.name.trim() === '') {
      toast.error("Subcategory name is required");
      return;
    }

    const slug = newSubcategory.slug || createSlug(newSubcategory.name);
    
    try {
      const { data, error } = await supabase
        .from('product_subcategories')
        .insert([
          { 
            name: newSubcategory.name.trim(),
            slug: slug,
            category_id: selectedCategory
          }
        ])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data[0]) {
        toast.success(`Subcategory "${newSubcategory.name}" added successfully`);
        
        // Update subcategories list
        setSubcategories([...subcategories, { id: data[0].id, name: data[0].name }]);
        
        // Select the new subcategory
        form.setValue("subcategory", data[0].id);
        
        // Reset form and close dialog
        setNewSubcategory({ name: '', slug: '' });
        setNewSubcategoryDialogOpen(false);
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
      toast.error(`Failed to add subcategory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Handle slug generation on category name change
  const handleCategoryNameChange = (name: string) => {
    setNewCategory({
      ...newCategory,
      name,
      slug: createSlug(name)
    });
  };

  // Handle slug generation on subcategory name change
  const handleSubcategoryNameChange = (name: string) => {
    setNewSubcategory({
      ...newSubcategory,
      name,
      slug: createSlug(name)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Basic product information including name, price, and tax details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Description Field */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> 
                  Short Description
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter a brief description" 
                  className="resize-none" 
                  rows={2}
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A brief summary of the product for product listings and search results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Selection with Add New Button - FIX HERE: MOVED className to SelectTrigger */}
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
        
        {/* Subcategory Selection with Add New Button - FIX HERE: MOVED className to SelectTrigger */}
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="variable">Variable</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                A simple product has one price, a variable product can have different variations with different prices.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular Price (₹)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "simple" && (
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="hsnCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <Hash className="h-4 w-4 mr-1" /> 
                  HSN Code
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter HSN code" {...field} />
              </FormControl>
              <FormDescription>
                Harmonized System Nomenclature code for the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="taxStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Tax Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="taxable" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Taxable
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="non-taxable" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Non-taxable
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Class</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={form.watch("taxStatus") === "non-taxable"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      
      {/* Add New Category Dialog */}
      <Dialog open={newCategoryDialogOpen} onOpenChange={setNewCategoryDialogOpen}>
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
            <Button variant="outline" onClick={() => setNewCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add New Subcategory Dialog */}
      <Dialog open={newSubcategoryDialogOpen} onOpenChange={setNewSubcategoryDialogOpen}>
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
              <Input 
                value={categories.find(c => c.id === selectedCategory)?.name || ''}
                disabled
              />
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
            <Button variant="outline" onClick={() => setNewSubcategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubcategory}>
              Add Subcategory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default GeneralTab;
