
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './productFormSchema';

export function useProductAttributes(form: UseFormReturn<ProductFormValues>) {
  const potencyValues = form.watch('potencies') || [];
  const packSizeValues = form.watch('packSizes') || [];

  const handleAddPotency = (value: string) => {
    if (value && !potencyValues.includes(value)) {
      form.setValue('potencies', [...potencyValues, value]);
    }
  };

  const handleRemovePotency = (value: string) => {
    form.setValue('potencies', potencyValues.filter(v => v !== value));
  };

  const handleAddPackSize = (value: string) => {
    if (value && !packSizeValues.includes(value)) {
      form.setValue('packSizes', [...packSizeValues, value]);
    }
  };

  const handleRemovePackSize = (value: string) => {
    form.setValue('packSizes', packSizeValues.filter(v => v !== value));
  };

  return {
    potencyValues,
    packSizeValues,
    handleAddPotency,
    handleRemovePotency,
    handleAddPackSize,
    handleRemovePackSize
  };
}
