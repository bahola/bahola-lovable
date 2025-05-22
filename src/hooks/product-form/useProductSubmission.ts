
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProductFormValues } from './productFormSchema';
import { defaultValues } from './productFormSchema';

export function useProductSubmission(
  form: UseFormReturn<ProductFormValues>,
  productId: string | null,
  imageUrls: string[],
  setActiveTab: (tab: string) => void,
  onProductAdded?: (product?: any) => void,
  isEditing = false
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Handle form submission
  const onSubmit = async (data: ProductFormValues) => {
    console.log('Submitting product data:', data);
    setIsSubmitting(true);
    
    try {
      // Format dimensions for database storage
      const dimensionsString = `${data.dimensions.length}/${data.dimensions.width}/${data.dimensions.height}`;

      // Build the product object for the database
      const productData = {
        name: data.name,
        type: data.type,
        description: data.description,
        // No short_description field in the database, so we skip it
        stock: data.type === 'simple' ? data.stock : null, // Only set stock for simple products
        hsn_code: data.hsnCode,
        price: data.price,
        category_id: data.category || null,
        subcategory_id: data.subcategory || null,
        weight: data.weight,
        dimensions: dimensionsString,
        tax_status: data.taxStatus,
        tax_class: data.taxClass,
        potencies: data.potencies,
        pack_sizes: data.packSizes,
        // Include image URL if available
        image: imageUrls.length > 0 ? imageUrls[0] : null,
        // Additional related product fields
        upsell_products: data.upsellProducts,
        cross_sell_products: data.crossSellProducts,
      };

      let product;

      if (isEditing && productId) {
        // Update existing product
        const { data: updatedProduct, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId)
          .select()
          .single();

        if (error) throw error;
        product = updatedProduct;

        // Delete existing variations
        const { error: deleteError } = await supabase
          .from('product_variations')
          .delete()
          .eq('product_id', productId);

        if (deleteError) throw deleteError;
      } else {
        // Create new product
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();

        if (error) throw error;
        product = newProduct;
      }

      // Add variations if product type is 'variable'
      if (data.type === 'variable' && data.variations && data.variations.length > 0) {
        const variationsData = data.variations.map(variation => ({
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

        if (variationError) throw variationError;
      }

      // Show success message and call callback
      toast({
        title: isEditing ? "Product updated" : "Product added",
        description: isEditing 
          ? "Product has been successfully updated." 
          : "Product has been added to the inventory."
      });
      
      if (onProductAdded) onProductAdded(product);
      form.reset(defaultValues);
      setActiveTab('general');
      
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: "Error saving product",
        description: error.message || "There was an error saving the product.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    onSubmit
  };
}
