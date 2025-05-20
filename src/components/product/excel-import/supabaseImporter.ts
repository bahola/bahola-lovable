
import { supabase } from "@/integrations/supabase/client";
import { ProcessedProductData } from './types';

export const importProductsToSupabase = async (products: ProcessedProductData[]) => {
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
