
import { Product } from '@/types/product';
import { ERPNextItem } from '@/types/erpnext';

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
