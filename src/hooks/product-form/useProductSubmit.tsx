
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { ProductVariation } from '@/types/product';
import { UseFormReturn } from 'react-hook-form';

interface UseProductSubmitProps {
  form: UseFormReturn<any>;
  variations: ProductVariation[];
  onProductAdded?: (product?: any) => void;
  isEditing: boolean;
  productId: string | null;
  imageUrls: string[];
}

export const useProductSubmit = ({
  form,
  variations,
  onProductAdded,
  isEditing,
  productId,
  imageUrls
}: UseProductSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    console.log('Submitting product form with values:', values);
    console.log('Current image URLs:', imageUrls);
    
    try {
      let product;
      
      // Format dimensions string (length/width/height)
      const dimensions = `${values.dimensions.length}/${values.dimensions.width}/${values.dimensions.height}`;
      
      // Get the main image URL from imageUrls if available
      const mainImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
      console.log('Using main image for product:', mainImage);
      
      // Prepare product data
      const productData = {
        name: values.name,
        type: values.type,
        description: values.description,
        short_description: values.shortDescription,
        hsn_code: values.hsnCode,
        price: values.price,
        stock: values.type === 'simple' ? values.stock : null,
        weight: values.weight,
        dimensions,
        // Use the first image URL as the main product image
        image: mainImage,
        category_id: values.category || null,
        subcategory_id: values.subcategory || null,
        potencies: values.type === 'variable' ? values.potencies : null,
        pack_sizes: values.type === 'variable' ? values.packSizes : null,
        benefits: values.benefits || [],
        usage_instructions: values.usage_instructions || null,
        ingredients: values.ingredients || null,
        // Add tax fields but don't use the "tax_" prefix in the database columns
        tax_status: values.taxStatus || 'taxable',
        tax_class: values.taxClass || '5'
      };
      
      console.log('Submitting product data:', productData);
      
      if (isEditing && productId) {
        // Update existing product - remove tax fields that don't exist in the database schema
        const { tax_status, tax_class, ...productDataWithoutTax } = productData;
        
        // Add tax data in the correct format for the database
        const dataToUpdate = {
          ...productDataWithoutTax,
          // Store tax data in the correct format for your database schema
          // For example, if your database uses these column names:
          taxable: tax_status === 'taxable',
          tax_rate: tax_class
        };
        
        const { data: updatedProduct, error } = await supabase
          .from('products')
          .update(dataToUpdate)
          .eq('id', productId)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        product = updatedProduct;
        console.log('Updated product:', product);
        
        // Handle variations for variable products
        if (values.type === 'variable' && variations) {
          // First, delete existing variations
          const { error: deleteError } = await supabase
            .from('product_variations')
            .delete()
            .eq('product_id', productId);
          
          if (deleteError) {
            throw deleteError;
          }
          
          // Then add new variations
          if (variations.length > 0) {
            const variationsData = variations.map(variation => ({
              product_id: productId,
              potency: variation.potency,
              pack_size: variation.packSize,
              price: variation.price,
              stock: variation.stock,
              weight: variation.weight
            }));
            
            const { error: variationError } = await supabase
              .from('product_variations')
              .insert(variationsData);
            
            if (variationError) {
              throw variationError;
            }
          }
        }
        
        toast({
          title: "Product updated",
          description: `${values.name} has been updated successfully.`
        });
      } else {
        // Insert new product - remove tax fields that don't exist in the database schema
        const { tax_status, tax_class, ...productDataWithoutTax } = productData;
        
        // Add tax data in the correct format for the database
        const dataToInsert = {
          ...productDataWithoutTax,
          // Store tax data in the correct format for your database schema
          taxable: tax_status === 'taxable',
          tax_rate: tax_class
        };
        
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert(dataToInsert)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        product = newProduct;
        console.log('Created new product:', product);
        
        // Add variations for variable products
        if (values.type === 'variable' && variations.length > 0) {
          const variationsData = variations.map(variation => ({
            product_id: product.id,
            potency: variation.potency,
            pack_size: variation.packSize,
            price: variation.price,
            stock: variation.stock,
            weight: variation.weight
          }));
          
          const { error: variationError } = await supabase
            .from('product_variations')
            .insert(variationsData);
          
          if (variationError) {
            throw variationError;
          }
        }
        
        toast({
          title: "Product created",
          description: `${values.name} has been created successfully.`
        });
      }
      
      if (onProductAdded) {
        onProductAdded(product);
      }
      
      return product;
    } catch (error: any) {
      console.error('Error submitting product:', error);
      toast({
        title: "Failed to save product",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { isSubmitting, onSubmit };
};
