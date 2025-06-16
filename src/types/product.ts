
export interface ProductVariation {
  potency: string;
  packSize: string;
  price: number;
  stock: number;
  weight: number;  // Added weight field for variations
}

export interface Product {
  id?: string; // Changed to only accept string type for consistency with Supabase
  name: string;
  type: 'simple' | 'variable';
  description: string;
  hsnCode: string;  // HSN (Harmonized System Nomenclature) code
  price: number;
  stock?: number;    // Adding stock property to match ProductListItem
  weight: number;    // Base weight in grams
  dimensions: string;  // Length/Width/Height in cm
  image?: string;
  category?: string;  // Add category property
  subcategory?: string; // Added subcategory field
  packSizes?: string[];
  potencies?: string[];
  variations?: ProductVariation[];
  tax_status?: 'taxable' | 'non-taxable';
  tax_class?: '0' | '5' | '12';
}
