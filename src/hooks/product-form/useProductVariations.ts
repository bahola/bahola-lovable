
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './productFormSchema';
import { ProductVariation } from '@/types/product';

export function useProductVariations(
  form: UseFormReturn<ProductFormValues>,
  productType: 'simple' | 'variable',
  potencyValues: string[],
  packSizeValues: string[]
) {
  const variations = form.watch('variations') || [];

  // Create and update variations based on potencies and pack sizes
  useEffect(() => {
    if (productType === 'variable' && (potencyValues.length > 0 || packSizeValues.length > 0)) {
      // Generate combinations of potency and pack sizes
      let newVariations: ProductVariation[] = [];
      
      if (potencyValues.length === 0) {
        // Only pack sizes
        packSizeValues.forEach(packSize => {
          newVariations.push({
            potency: '',  // Empty string for potency, but still required
            packSize,
            price: form.getValues('price'),
            stock: 0,
            weight: form.getValues('weight')
          });
        });
      } else if (packSizeValues.length === 0) {
        // Only potencies
        potencyValues.forEach(potency => {
          newVariations.push({
            potency,
            packSize: '',  // Empty string for packSize, but still required
            price: form.getValues('price'),
            stock: 0,
            weight: form.getValues('weight')
          });
        });
      } else {
        // Both potencies and pack sizes
        potencyValues.forEach(potency => {
          packSizeValues.forEach(packSize => {
            newVariations.push({
              potency,
              packSize,
              price: form.getValues('price'),
              stock: 0,
              weight: form.getValues('weight')
            });
          });
        });
      }
      
      // Update form with new variations
      form.setValue('variations', newVariations);
    }
  }, [productType, potencyValues, packSizeValues, form]);

  // Handle variations update
  const handleUpdateVariation = (index: number, field: keyof ProductVariation, value: any) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { 
      ...updatedVariations[index], 
      [field]: value 
    };
    form.setValue('variations', updatedVariations);
  };

  return {
    variations,
    handleUpdateVariation
  };
}
