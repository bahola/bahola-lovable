
export interface ProcessedProductData {
  name: string;
  type: string;
  description: string;
  hsn_code: string;
  price: number;
  stock: number | null;
  weight: number;
  dimensions: string | null;
  category: string | null;
  subcategory: string | null;
  pack_sizes?: string[];
  potencies?: string[];
  variations?: Array<{
    potency: string;
    pack_size: string;
    price: number;
    stock: number;
    weight: number;
  }>;
}

export interface ExcelImporterProps {
  onImportSuccess: (data: any[]) => void;
  onImportError: (error: string) => void;
}

export interface FieldMappings {
  [key: string]: string;
}
