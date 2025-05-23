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
}

export const useProductSubmit = ({
  form,
  variations,
  onProductAdded,
  isEditing,
  productId
}: UseProductSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    console.log('Submitting product form with values:', values);
    
    try {
      let product;
      
      // Format dimensions string (length/width/height)
      const dimensions = `${values.dimensions.length}/${values.dimensions.width}/${values.dimensions.height}`;
      
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
        image: form.getValues('image') || null,
        category_id: values.category || null,
        subcategory_id: values.subcategory || null,
        potencies: values.type === 'variable' ? values.potencies : null,
        pack_sizes: values.type === 'variable' ? values.packSizes : null,
        benefits: values.benefits || [],
        usage_instructions: values.usage_instructions || null,
        ingredients: values.ingredients || null
      };
      
      console.log('Submitting product data:', productData);
      
      if (isEditing && productId) {
        // Update existing product
        const { data: updatedProduct, error } = await supabase
          .from('products')
          .update(productData)
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
        // Insert new product
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert(productData)
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
