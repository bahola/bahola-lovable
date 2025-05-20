
import { FieldMappings } from './types';

// Field mapping between Excel headers and our database fields
export const fieldMappings: FieldMappings = {
  'product name': 'name',
  'name': 'name',
  'type': 'type',
  'description': 'description',
  'hsn code': 'hsnCode',
  'hsncode': 'hsnCode',
  'hsnCode': 'hsnCode',
  'price': 'price',
  'sale price': 'price',
  'stock': 'stock',
  'stock quantity': 'stock',
  'weight': 'weight',
  'base weight in grams': 'weight',
  'dimensions': 'dimensions',
  'category': 'category',
  'subcategory': 'subcategory',
  'packsizes': 'packSizes',
  'pack sizes': 'packSizes',
  'potencies': 'potencies',
  'variations': 'variations'
};

// Normalize field names to handle case-insensitive and space variations
export const normalizeFieldName = (fieldName: string): string => {
  const normalizedName = fieldName.toLowerCase().trim();
  return fieldMappings[normalizedName] || normalizedName;
};
