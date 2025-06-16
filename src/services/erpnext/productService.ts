
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
export const fetchERPNextItems = async (filters?: any[]): Promise<ERPNextItem[]> => {
  const filterObj: Record<string, any> = {};
  
  // Convert array filters to object format if provided
  if (filters && filters.length > 0) {
    filters.forEach(filter => {
      if (Array.isArray(filter) && filter.length >= 3) {
        filterObj[filter[0]] = filter[2];
      }
    });
  }
  
  const result = await erpnextAPI.fetchItems(filterObj);
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch ERPNext items');
  }
  
  return result.data || [];
};
