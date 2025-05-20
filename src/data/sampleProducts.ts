
// src/data/sampleProducts.ts - Adding just the interface definition
export interface ProductListItem {
  id: string;
  name: string;
  type: 'simple' | 'variable';
  hsnCode: string;
  price: number;
  stock: number;
  variations: number;
  category?: string; // Add this property to fix TypeScript error
}

// Sample data
export const sampleProducts: ProductListItem[] = [
  {
    id: 'PRD001',
    name: 'Arnica Montana',
    type: 'variable',
    hsnCode: '30049011',
    price: 185,
    stock: 96,
    variations: 6
  },
  {
    id: 'PRD002',
    name: 'Bryonia Alba',
    type: 'simple',
    hsnCode: '30049011',
    price: 175,
    stock: 45,
    variations: 0
  },
  {
    id: 'PRD003',
    name: 'Belladonna',
    type: 'variable',
    hsnCode: '30049011',
    price: 195,
    stock: 72,
    variations: 4
  },
  {
    id: 'PRD004',
    name: 'Nux Vomica',
    type: 'variable',
    hsnCode: '30049011',
    price: 205,
    stock: 63,
    variations: 5
  },
  {
    id: 'PRD005',
    name: 'Pulsatilla',
    type: 'simple',
    hsnCode: '30049011',
    price: 170,
    stock: 38,
    variations: 0
  },
];
