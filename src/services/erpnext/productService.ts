
import { erpRequest } from './erpnextService';
import { ERPNextItem } from '@/types/erpnext';
import { Product } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';

/**
 * Interface for product import configuration
 */
export interface ProductImportConfig {
  updateExisting: boolean;
  createCategories: boolean;
  importDisabled: boolean;
  categoryMapping?: Record<string, string>;
}

/**
 * Interface for import results
 */
export interface ImportResult {
  success: boolean;
  imported: number;
  updated: number;
  errors: string[];
  skipped: number;
}

/**
 * Fetch all items from ERPNext
 */
export const fetchERPNextItems = async (filters?: any): Promise<ERPNextItem[]> => {
  try {
    console.log('Fetching items from ERPNext...');
    
    const fields = [
      'name',
      'item_code',
      'item_name',
      'item_group',
      'description',
      'stock_uom',
      'disabled',
      'is_stock_item',
      'image',
      'standard_rate',
      'valuation_rate',
      'gst_hsn_code',
      'hsn_code',
      'weight_per_unit',
      'brand',
      'opening_stock',
      'shelf_life_in_days',
      'has_variants',
      'variant_of'
    ];

    const params = new URLSearchParams();
    params.append('fields', JSON.stringify(fields));
    
    // Default filter to exclude disabled items unless specifically requested
    const defaultFilters = filters || [['disabled', '=', 0]];
    params.append('filters', JSON.stringify(defaultFilters));
    
    // Limit to avoid timeout, can be paginated later
    params.append('limit_page_length', '1000');
    
    const response = await erpRequest<{message: ERPNextItem[]}>(`/api/resource/Item?${params.toString()}`, 'GET');
    
    console.log(`Fetched ${response.message.length} items from ERPNext`);
    return response.message;
  } catch (error) {
    console.error('Error fetching ERPNext items:', error);
    throw new Error(`Failed to fetch items from ERPNext: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetch a single item from ERPNext by item code
 */
export const fetchERPNextItem = async (itemCode: string): Promise<ERPNextItem> => {
  try {
    const response = await erpRequest<{message: ERPNextItem}>(`/api/resource/Item/${itemCode}`, 'GET');
    return response.message;
  } catch (error) {
    console.error(`Error fetching ERPNext item ${itemCode}:`, error);
    throw new Error(`Failed to fetch item ${itemCode} from ERPNext: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

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
const getOrCreateCategory = async (categoryName: string): Promise<string> => {
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

/**
 * Import products from ERPNext to local database
 */
export const importProductsFromERPNext = async (
  items: ERPNextItem[],
  config: ProductImportConfig
): Promise<ImportResult> => {
  const result: ImportResult = {
    success: true,
    imported: 0,
    updated: 0,
    errors: [],
    skipped: 0
  };

  console.log(`Starting import of ${items.length} items from ERPNext...`);

  for (const erpItem of items) {
    try {
      // Skip disabled items unless configured to import them
      if (erpItem.disabled && !config.importDisabled) {
        result.skipped++;
        continue;
      }

      // Map ERPNext item to local format
      const localProduct = await mapERPNextToLocal(erpItem, config.categoryMapping);

      // Check if product already exists (by HSN code or name)
      const { data: existingProduct } = await supabase
        .from('products')
        .select('id')
        .or(`hsn_code.eq.${localProduct.hsnCode},name.eq.${localProduct.name}`)
        .single();

      if (existingProduct && config.updateExisting) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(localProduct)
          .eq('id', existingProduct.id);

        if (error) {
          result.errors.push(`Error updating product ${erpItem.item_name}: ${error.message}`);
          result.success = false;
        } else {
          result.updated++;
        }
      } else if (!existingProduct) {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert(localProduct);

        if (error) {
          result.errors.push(`Error creating product ${erpItem.item_name}: ${error.message}`);
          result.success = false;
        } else {
          result.imported++;
        }
      } else {
        // Product exists but update not enabled
        result.skipped++;
      }
    } catch (error) {
      result.errors.push(`Error processing item ${erpItem.item_name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      result.success = false;
    }
  }

  console.log(`Import completed. Imported: ${result.imported}, Updated: ${result.updated}, Skipped: ${result.skipped}, Errors: ${result.errors.length}`);
  return result;
};

/**
 * Get ERPNext item groups for category mapping
 */
export const fetchERPNextItemGroups = async (): Promise<string[]> => {
  try {
    const response = await erpRequest<{message: Array<{name: string}>>>('/api/resource/Item Group?fields=["name"]&limit_page_length=1000', 'GET');
    return response.message.map(group => group.name);
  } catch (error) {
    console.error('Error fetching ERPNext item groups:', error);
    throw new Error(`Failed to fetch item groups from ERPNext: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
