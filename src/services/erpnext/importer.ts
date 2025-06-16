
import { ERPNextItem } from '@/types/erpnext';
import { ProductImportConfig, ImportResult } from './types';
import { mapERPNextToLocal } from './mapping';
import { supabase } from '@/integrations/supabase/client';

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
