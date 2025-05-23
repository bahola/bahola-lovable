
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { ProductFormSchema } from '../useProductForm';

interface UseProductSubmitProps {
  form: any;
  variations: any[];
  onProductAdded?: (product?: any) => void;
  isEditing?: boolean;
  productId?: string | null;
  imageUrls: string[];
}

export const useProductSubmit = ({
  form,
  variations,
  onProductAdded,
  isEditing = false,
  productId,
  imageUrls
}: UseProductSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: ProductFormSchema) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting product form with values:', values);
      console.log('Current image URLs:', imageUrls);

      // Get the main image URL from imageUrls array
      const mainImageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
      console.log('Using main image for product:', mainImageUrl);

      // Prepare the product data for submission
      const productData = {
        name: values.name,
        type: values.type,
        description: values.description || '',
        short_description: values.shortDescription || '',
        hsn_code: values.hsnCode,
        price: values.price,
        stock: values.stock || 0,
        weight: values.weight,
        dimensions: `${values.dimensions.length}/${values.dimensions.width}/${values.dimensions.height}`,
        image: mainImageUrl, // Use the main image URL from the imageUrls array
        category_id: values.category || null,
        subcategory_id: values.subcategory || null,
        potencies: values.potencies && values.potencies.length > 0 ? values.potencies : null,
        pack_sizes: values.packSizes && values.packSizes.length > 0 ? values.packSizes : null,
        benefits: values.benefits || [],
        usage_instructions: values.usage_instructions || null,
        ingredients: values.ingredients || null,
        tax_status: values.taxStatus,
        tax_class: values.taxClass,
      };

      console.log('Submitting product data:', productData);

      let result;
      if (isEditing && productId) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();

        if (error) throw error;
        result = data;
      }

      // Handle variations if it's a variable product
      if (values.type === 'variable' && variations.length > 0 && result?.id) {
        // First, delete existing variations if editing
        if (isEditing) {
          await supabase
            .from('product_variations')
            .delete()
            .eq('product_id', result.id);
        }

        // Insert new variations
        const variationData = variations.map(variation => ({
          product_id: result.id,
          potency: variation.potency,
          pack_size: variation.packSize,
          price: variation.price,
          stock: variation.stock,
          weight: variation.weight,
        }));

        const { error: variationError } = await supabase
          .from('product_variations')
          .insert(variationData);

        if (variationError) {
          console.error('Error inserting variations:', variationError);
          throw variationError;
        }
      }

      console.log('Product submitted successfully:', result);

      toast({
        title: isEditing ? "Product updated successfully" : "Product created successfully",
        description: `${result.name} has been ${isEditing ? 'updated' : 'created'}.`,
      });

      if (onProductAdded) {
        onProductAdded(result);
      }

      return result;
    } catch (error) {
      console.error('Error submitting product:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} product. Please try again.`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    onSubmit,
  };
};
