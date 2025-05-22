
import { useState } from 'react';
import { ProductFormValues } from './productFormSchema';
import { ProductVariation } from '@/types/product';

export function useProductFormInitialization(initialProduct?: any) {
  const [productId, setProductId] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  function getInitialValues(initialProduct: any): ProductFormValues {
    try {
      console.log('Setting up form with initial product:', initialProduct);
      
      // Parse dimensions string if exists
      let dimensionsObj = { length: 0, width: 0, height: 0 };
      if (initialProduct.dimensions) {
        try {
          const [length, width, height] = initialProduct.dimensions.split('/').map(Number);
          dimensionsObj = { length: isNaN(length) ? 0 : length, width: isNaN(width) ? 0 : width, height: isNaN(height) ? 0 : height };
        } catch (e) {
          console.error('Error parsing dimensions:', e);
        }
      }
      
      // Set product ID for editing
      if (initialProduct.id) {
        setProductId(initialProduct.id);
      }
      
      // Set image URLs if available
      const imageUrlsValue = initialProduct.image ? [initialProduct.image] : [];
      setImageUrls(imageUrlsValue);
      
      // Format variations to ensure they match the ProductVariation type
      let formattedVariations: ProductVariation[] = [];
      if (Array.isArray(initialProduct.product_variations)) {
        formattedVariations = initialProduct.product_variations.map((v: any) => ({
          potency: v.potency || '',
          packSize: v.pack_size || '',
          price: Number(v.price) || 0,
          stock: Number(v.stock) || 0,
          weight: Number(v.weight) || 0,
        }));
      }
      
      // Return formatted initial values
      return {
        name: initialProduct.name || "",
        type: initialProduct.type || "simple",
        shortDescription: initialProduct.short_description || "",
        description: initialProduct.description || "",
        stock: initialProduct.stock || 0,
        hsnCode: initialProduct.hsn_code || "",
        price: initialProduct.price || 0,
        category: initialProduct.category_id || "",
        subcategory: initialProduct.subcategory_id || "", 
        weight: initialProduct.weight || 0,
        dimensions: dimensionsObj,
        taxStatus: initialProduct.tax_status || "taxable",
        taxClass: initialProduct.tax_class || "5",
        potencies: initialProduct.potencies || [],
        packSizes: initialProduct.pack_sizes || [],
        variations: formattedVariations,
        upsellProducts: initialProduct.upsell_products || [],
        crossSellProducts: initialProduct.cross_sell_products || [],
      };
    } catch (error) {
      console.error('Error initializing form with product data:', error);
      throw error;
    }
  }

  return {
    productId,
    setProductId,
    imageUrls,
    setImageUrls,
    getInitialValues
  };
}
