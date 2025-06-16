
import { ERPNextItem } from '@/types/erpnext';
import { Product } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';

/**
 * Map ERPNext item to local product format
 */
export const mapERPNextToLocal = async (erpItem: ERPNextItem, categoryMapping?: Record<string, string>): Promise<Partial<Product>> => {
  // Get or create category
  let categoryId: string | null = null;
  let subcategoryId: string | null = null;
  
  if (erpItem.item_group) {
    const mappedCategory = categoryMapping?.[erpItem.item_group] || erpItem.item_group;
    categoryId = await getOrCreateCategory(mappedCategory);
  }

  // Determine HSN code from available fields
  const hsnCode = erpItem.gst_hsn_code || erpItem.hsn_code || erpItem.item_code;

  // Determine product type (simple vs variable)
  const productType = erpItem.has_variants ? 'variable' : 'simple';

  const mappedProduct: Partial<Product> = {
    name: erpItem.item_name,
    type: productType,
    description: erpItem.description || '',
    hsnCode: hsnCode,
    price: erpItem.standard_rate || 0,
    stock: erpItem.opening_stock || 0,
    weight: erpItem.weight_per_unit || 0,
    dimensions: '', // Not available in ERPNext Item, could be custom field
    image: erpItem.image || undefined,
    category: categoryId ? undefined : erpItem.item_group, // Use category name if no ID
    subcategory: subcategoryId ? undefined : undefined,
    // Store ERPNext reference for future sync
    // Note: This would require adding erpnext_item_code field to products table
  };

  return mappedProduct;
};

/**
 * Get or create a category in the local database
 */
export const getOrCreateCategory = async (categoryName: string): Promise<string> => {
  try {
    // First, try to find existing category
    const { data: existingCategory } = await supabase
      .from('product_categories')
      .select('id')
      .eq('name', categoryName)
      .eq('type', 'category')
      .single();

    if (existingCategory) {
      return existingCategory.id;
    }

    // Create new category
    const { data: newCategory, error } = await supabase
      .from('product_categories')
      .insert({
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        type: 'category'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }

    console.log(`Created new category: ${categoryName}`);
    return newCategory.id;
  } catch (error) {
    console.error(`Error handling category ${categoryName}:`, error);
    // Return null to fall back to category name
    throw error;
  }
};
