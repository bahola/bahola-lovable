
export interface ProductVariation {
  potency: string;
  packSize: string;
  price: number;
  stock: number;
}

export interface Product {
  id?: string | number;
  name: string;
  type: 'simple' | 'variable';
  description: string;
  hsnCode: string;  // HSN (Harmonized System Nomenclature) code
  price: number;
  weight: number;  // in grams
  dimensions: string;  // Length/Width/Height in cm
  image?: string;
  packSizes?: string[];
  potencies?: string[];
  variations?: ProductVariation[];
}
