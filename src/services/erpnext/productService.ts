
// Main export file for ERPNext product services
export * from './types';
export * from './api';
export * from './mapping';
export * from './importer';

import { ERPNextItem } from '@/types/erpnext';
import { erpnextAPI } from './api';

/**
 * Fetch ERPNext items with optional filters
 */
export const fetchERPNextItems = async (filters?: Record<string, any>): Promise<ERPNextItem[]> => {
  const result = await erpnextAPI.fetchItems(filters || {});
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch ERPNext items');
  }
  
  return result.data || [];
};
