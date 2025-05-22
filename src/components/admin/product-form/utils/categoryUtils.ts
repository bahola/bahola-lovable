
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Function to create a slug from a name
export const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Add new category to database
export const addCategory = async (name: string, slug: string) => {
  if (name.trim() === '') {
    toast.error("Category name is required");
    return null;
  }

  const finalSlug = slug || createSlug(name);
  
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([
        { 
          name: name.trim(),
          slug: finalSlug,
          type: 'product' // Default type
        }
      ])
      .select();
      
    if (error) {
      throw error;
    }
    
    if (data && data[0]) {
      toast.success(`Category "${name}" added successfully`);
      return data[0];
    }
    return null;
  } catch (error) {
    console.error('Error adding category:', error);
    toast.error(`Failed to add category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
};

// Add new subcategory to database
export const addSubcategory = async (name: string, slug: string, categoryId: string) => {
  if (!categoryId) {
    toast.error("Please select a category first");
    return null;
  }
  
  if (name.trim() === '') {
    toast.error("Subcategory name is required");
    return null;
  }

  const finalSlug = slug || createSlug(name);
  
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .insert([
        { 
          name: name.trim(),
          slug: finalSlug,
          category_id: categoryId
        }
      ])
      .select();
      
    if (error) {
      throw error;
    }
    
    if (data && data[0]) {
      toast.success(`Subcategory "${name}" added successfully`);
      return data[0];
    }
    return null;
  } catch (error) {
    console.error('Error adding subcategory:', error);
    toast.error(`Failed to add subcategory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
};
