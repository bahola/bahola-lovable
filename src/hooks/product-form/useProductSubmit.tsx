
import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { ProductFormSchema } from '@/hooks/useProductForm';
import { ProductVariation } from "@/types/product";

interface UseProductSubmitProps {
  form: UseFormReturn<ProductFormSchema>;
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(async (values: ProductFormSchema) => {
    try {
      setIsSubmitting(true);
      
      // Add variations if product type is variable
      if (values.type === "variable") {
        values.variations = variations;
      }
      
      console.log(`${isEditing ? 'Updating' : 'Saving'} product with data:`, values);
      
      // Format dimensions as a string for storage
      const dimensionsFormatted = `${values.dimensions.length}/${values.dimensions.width}/${values.dimensions.height}`;
      
      // Set category and subcategory to null if empty
      const categoryId = values.category && values.category !== "" ? values.category : null;
      const subcategoryId = values.subcategory && values.subcategory !== "" ? values.subcategory : null;
      
      // Prepare the product data
      const productData = {
        name: values.name,
        type: values.type,
        description: values.description,
        short_description: values.shortDescription,
        hsn_code: values.hsnCode,
        price: values.price,
        stock: values.type === 'simple' ? values.stock : null, // Stock for simple products
        weight: values.weight,
        dimensions: dimensionsFormatted,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        pack_sizes: values.type === 'variable' ? values.packSizes : null,
        potencies: values.type === 'variable' ? values.potencies : null
      };
      
      let newProduct;
      
      if (isEditing && productId) {
        // Update the product in Supabase
        const { data: updatedProduct, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId)
          .select()
          .single();
          
        if (error) {
          throw error;
        }
        
        newProduct = updatedProduct;
        
        // If it's a variable product, first delete existing variations then insert new ones
        if (values.type === 'variable' && values.variations) {
          // Delete existing variations
          const { error: deleteError } = await supabase
            .from('product_variations')
            .delete()
            .eq('product_id', productId);
            
          if (deleteError) {
            console.error('Error deleting existing variations:', deleteError);
            // Continue anyway to try to insert new variations
          }
          
          // Insert new variations
          const variationsData = values.variations.map(variation => ({
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
            console.error('Error updating variations:', variationError);
            toast({
              title: "Warning",
              description: `Product updated but there was an issue with variations: ${variationError.message}`,
              variant: "destructive",
            });
          }
        }
      } else {
        // Insert the new product into Supabase
        const { data: insertedProduct, error } = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();
          
        if (error) {
          throw error;
        }
        
        newProduct = insertedProduct;
        
        // If it's a variable product, insert the variations
        if (values.type === 'variable' && values.variations && newProduct) {
          const variationsData = values.variations.map(variation => ({
            product_id: newProduct.id,
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
            console.error('Error creating variations:', variationError);
            toast({
              title: "Warning",
              description: `Product saved but there was an issue with variations: ${variationError.message}`,
              variant: "destructive",
            });
          }
        }
      }
      
      // Display success message
      toast({
        title: isEditing ? "Product updated successfully" : "Product saved successfully",
        description: `The product "${values.name}" has been ${isEditing ? 'updated' : 'added'} to your inventory.`,
      });
      
      // Call the callback if provided
      if (onProductAdded) {
        onProductAdded(newProduct);
      }
      
      return newProduct;
      
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'saving'} product:`, error);
      toast({
        title: `Failed to ${isEditing ? 'update' : 'save'} product`,
        description: error instanceof Error ? error.message : `There was an error ${isEditing ? 'updating' : 'saving'} your product. Please try again.`,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isEditing, onProductAdded, productId, toast, variations]);

  return {
    isSubmitting,
    onSubmit
  };
};
