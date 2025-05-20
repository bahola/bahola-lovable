export interface ProductListItem {
  id: string;
  name: string;
  type: 'simple' | 'variable';
  hsnCode: string;
  price: number;
  stock: number;
  variations: number;
  category: string;
  subcategory?: string;  // Added subcategory field
}
