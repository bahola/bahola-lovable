
import { ERPNextItem } from '@/types/erpnext';
import { ProductImportConfig, ImportResult, ImportPreviewItem } from './types';
import { mapERPNextToLocal } from './mapping';
import { supabase } from '@/integrations/supabase/client';

/**
 * Import products from ERPNext to local database with enhanced category mapping
 */
export const importProductsFromERPNext = async (
  items: ImportPreviewItem[],
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

      // Map ERPNext item to local format (now includes category assignments)
      const mappedProduct = await mapERPNextToLocal(erpItem, config.categoryMapping);

      // Build the final product data
      const localProduct = {
        name: mappedProduct.name || erpItem.item_name,
        type: mappedProduct.type || 'simple',
        hsn_code: mappedProduct.hsnCode || erpItem.gst_hsn_code || erpItem.hsn_code || erpItem.item_code,
        description: mappedProduct.description || '',
        price: mappedProduct.price || 0,
        stock: mappedProduct.stock || 0,
        weight: mappedProduct.weight || 0,
        dimensions: mappedProduct.dimensions || '',
        image: mappedProduct.image,
        // Use the mapped category IDs
        category_id: erpItem.proposedCategoryId || config.defaultCategoryId || null,
        subcategory_id: erpItem.proposedSubcategoryId || config.defaultSubcategoryId || null,
        pack_sizes: mappedProduct.packSizes || null,
        potencies: mappedProduct.potencies || null,
        tax_status: mappedProduct.tax_status || 'taxable',
        tax_class: mappedProduct.tax_class || '5'
      };

      console.log(`Processing item: ${erpItem.item_name}, Category: ${localProduct.category_id}, Subcategory: ${localProduct.subcategory_id}`);

      // Check if product already exists (by HSN code or name)
      const { data: existingProduct } = await supabase
        .from('products')
        .select('id')
        .or(`hsn_code.eq.${localProduct.hsn_code},name.eq.${localProduct.name}`)
        .maybeSingle();

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
          console.log(`Updated product: ${erpItem.item_name}`);
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
          console.log(`Created product: ${erpItem.item_name}`);
        }
      } else {
        // Product exists but update not enabled
        result.skipped++;
        console.log(`Skipped existing product: ${erpItem.item_name}`);
      }
    } catch (error) {
      result.errors.push(`Error processing item ${erpItem.item_name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      result.success = false;
    }
  }

  console.log(`Import completed. Imported: ${result.imported}, Updated: ${result.updated}, Skipped: ${result.skipped}, Errors: ${result.errors.length}`);
  return result;
};
