import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';

interface ExcelImporterProps {
  onImportSuccess: (data: any[]) => void;
  onImportError: (error: string) => void;
}

// Define an interface for the processed product data
interface ProcessedProductData {
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

// Field mapping between Excel headers and our database fields
const fieldMappings: Record<string, string> = {
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

export const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImportSuccess, onImportError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  // Normalize field names to handle case-insensitive and space variations
  const normalizeFieldName = (fieldName: string): string => {
    const normalizedName = fieldName.toLowerCase().trim();
    return fieldMappings[normalizedName] || normalizedName;
  };
  
  const processExcelData = async (data: any[]): Promise<ProcessedProductData[]> => {
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
  
  const importProductsToSupabase = async (products: ProcessedProductData[]) => {
    const importedProducts = [];
    
    try {
      for (const product of products) {
        // Skip header row if it exists
        if (product.name === 'Product Name') continue;
        
        // Find or create category
        let categoryId = null;
        if (product.category) {
          const { data: categoryData } = await supabase
            .from('product_categories')
            .select('id')
            .eq('name', product.category)
            .maybeSingle();
            
          if (categoryData) {
            categoryId = categoryData.id;
          } else {
            const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
            const { data: newCategory } = await supabase
              .from('product_categories')
              .insert({
                name: product.category,
                slug: categorySlug,
                type: 'product'
              })
              .select('id')
              .single();
              
            if (newCategory) categoryId = newCategory.id;
          }
        }
        
        // Find or create subcategory if category exists
        let subcategoryId = null;
        if (categoryId && product.subcategory) {
          const { data: subcategoryData } = await supabase
            .from('product_subcategories')
            .select('id')
            .eq('name', product.subcategory)
            .eq('category_id', categoryId)
            .maybeSingle();
            
          if (subcategoryData) {
            subcategoryId = subcategoryData.id;
          } else {
            const subcategorySlug = product.subcategory.toLowerCase().replace(/\s+/g, '-');
            const { data: newSubcategory } = await supabase
              .from('product_subcategories')
              .insert({
                name: product.subcategory,
                slug: subcategorySlug,
                category_id: categoryId
              })
              .select('id')
              .single();
              
            if (newSubcategory) subcategoryId = newSubcategory.id;
          }
        }
        
        // Insert the product
        const { data: newProduct, error: productError } = await supabase
          .from('products')
          .insert({
            name: product.name,
            type: product.type,
            description: product.description,
            hsn_code: product.hsn_code,
            price: product.price,
            stock: product.stock,
            weight: product.weight,
            dimensions: product.dimensions,
            category_id: categoryId,
            subcategory_id: subcategoryId,
            pack_sizes: product.pack_sizes || null,
            potencies: product.potencies || null
          })
          .select()
          .single();
          
        if (productError) {
          console.error('Error creating product:', productError);
          continue;
        }
        
        // Insert variations for variable products
        if (product.type === 'variable' && product.variations && newProduct) {
          const variations = product.variations.map((variation) => ({
            product_id: newProduct.id,
            potency: variation.potency,
            pack_size: variation.pack_size,
            price: variation.price,
            stock: variation.stock,
            weight: variation.weight
          }));
          
          const { error: variationError } = await supabase
            .from('product_variations')
            .insert(variations);
            
          if (variationError) {
            console.error('Error creating variations:', variationError);
          }
        }
        
        if (newProduct) {
          importedProducts.push({
            ...newProduct,
            packSizes: newProduct.pack_sizes,
            potencies: newProduct.potencies
          });
        }
      }
      
      return importedProducts;
    } catch (error) {
      console.error('Error importing to Supabase:', error);
      throw new Error('Failed to import products to the database.');
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          
          console.log('Raw Excel data:', jsonData);
          
          if (jsonData.length === 0) {
            throw new Error('Excel file appears to be empty or has no valid data.');
          }
          
          // Process the data
          const processedData = await processExcelData(jsonData);
          
          // Import to Supabase
          const importedProducts = await importProductsToSupabase(processedData);
          
          setIsLoading(false);
          toast({
            title: "Import successful",
            description: `${importedProducts.length} products imported to the database.`
          });
          onImportSuccess(importedProducts);
        } catch (error) {
          setIsLoading(false);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          onImportError(errorMessage);
          toast({
            title: "Import failed",
            description: errorMessage,
            variant: "destructive"
          });
        }
      };
      
      reader.onerror = () => {
        setIsLoading(false);
        onImportError('Failed to read the file.');
        toast({
          title: "Import failed",
          description: "Failed to read the file.",
          variant: "destructive"
        });
      };
      
      reader.readAsBinaryString(file);
    } catch (error) {
      setIsLoading(false);
      onImportError('Failed to process the file.');
      toast({
        title: "Import failed",
        description: "Failed to process the file.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" className="relative" disabled={isLoading}>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {isLoading ? 'Processing...' : 'Select Excel File'}
        </Button>
        
        {fileName && !isLoading && (
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-1" />
            {fileName}
          </div>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground">
        Supported formats: .xlsx, .xls
      </div>
    </div>
  );
};
