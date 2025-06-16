
import { erpRequest } from './erpnextService';
import { ERPNextItem } from '@/types/erpnext';

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
