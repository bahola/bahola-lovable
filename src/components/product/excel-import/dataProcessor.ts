
import { ProcessedProductData } from './types';
import { normalizeFieldName } from './fieldMappings';

export const processExcelData = async (data: any[]): Promise<ProcessedProductData[]> => {
  try {
    // Skip empty rows and normalize field names
    const normalizedData = data
      .filter(row => {
        // Skip completely empty rows
        return Object.values(row).some(value => value !== undefined && value !== null && value !== '');
      })
      .map(row => {
        const normalizedRow: Record<string, any> = {};
        
        Object.entries(row).forEach(([key, value]) => {
          const normalizedKey = normalizeFieldName(key);
          normalizedRow[normalizedKey] = value;
        });
        
        return normalizedRow;
      });
    
    if (normalizedData.length === 0) {
      throw new Error('Excel file contains no valid data rows.');
    }
    
    // Log the normalized data for debugging
    console.log('Normalized data:', normalizedData);
    
    // Process the normalized Excel data into the format we need
    const processedData = normalizedData.map(row => {
      // Basic validation with better error messages
      if (!row.name) {
        throw new Error('Missing product name in one or more rows. The "name" column is required.');
      }
      
      if (!row.type) {
        throw new Error(`Missing product type for "${row.name}". The "type" column is required.`);
      }
      
      if (!row.hsnCode) {
        throw new Error(`Missing HSN Code for "${row.name}". The "hsnCode" column is required.`);
      }
      
      // Initialize the processed row with required fields
      let processedRow: ProcessedProductData = { 
        name: row.name,
        type: row.type.toLowerCase(),
        description: row.description || '',
        hsn_code: row.hsnCode,
        price: Number(row.price) || 0,
        stock: row.type.toLowerCase() === 'simple' ? Number(row.stock) || 0 : null,
        weight: Number(row.weight) || 0,
        dimensions: row.dimensions || null,
        category: row.category || null,
        subcategory: row.subcategory || null
      };
      
      if (row.type.toLowerCase() === 'variable') {
        // Convert pack sizes from string to array
        if (row.packSizes) {
          processedRow.pack_sizes = row.packSizes.split(',').map((size: string) => size.trim());
        }
        
        // Convert potencies from string to array
        if (row.potencies) {
          processedRow.potencies = row.potencies.split(',').map((potency: string) => potency.trim());
        }
        
        // Process variations
        if (row.variations) {
          processedRow.variations = row.variations.split(',').map((variation: string) => {
            const [potency, packSize, price, stock, weight] = variation.trim().split('/');
            return {
              potency,
              pack_size: packSize,
              price: Number(price),
              stock: Number(stock),
              weight: Number(weight)
            };
          });
        }
      }
      
      return processedRow;
    });
    
    return processedData;
  } catch (error) {
    console.error('Error processing Excel data:', error);
    throw error;
  }
};
