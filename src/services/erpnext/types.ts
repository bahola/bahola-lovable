/**
 * Common ERPNext interface types
 */

import { ERPNextItem } from "@/types/erpnext";

export interface ProductImportConfig {
  updateExisting: boolean;
  createCategories: boolean;
  importDisabled: boolean;
  categoryMapping?: Record<string, string>;
  mappingRules?: CategoryMappingRule[];
  defaultCategoryId?: string;
  defaultSubcategoryId?: string;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  updated: number;
  errors: string[];
  skipped: number;
}

export interface CategoryMappingRule {
  id: string;
  name: string;
  type: 'pattern' | 'manual' | 'default';
  pattern?: string; // For pattern-based rules (regex)
  targetCategoryId: string;
  targetSubcategoryId?: string;
  priority: number; // Higher number = higher priority
  isActive: boolean;
}

export interface ImportPreviewItem extends ERPNextItem {
  proposedCategoryId?: string;
  proposedSubcategoryId?: string;
  proposedCategoryName?: string;
  proposedSubcategoryName?: string;
  mappingRule?: string;
}
