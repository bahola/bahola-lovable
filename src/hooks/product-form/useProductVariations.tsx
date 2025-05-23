
import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProductVariation } from "@/types/product";

export const useProductVariations = (form: UseFormReturn<any>) => {
  const [potencyValues, setPotencyValues] = useState<string[]>([]);
  const [packSizeValues, setPackSizeValues] = useState<string[]>([]);
  const [variations, setVariations] = useState<ProductVariation[]>([]);

  const generateVariations = useCallback((potencies: string[], packSizes: string[]) => {
    const newVariations: ProductVariation[] = [];
    const baseWeight = form.getValues("weight") || 0;
    
    // If both attributes exist, create combination variations
    if (potencies.length > 0 && packSizes.length > 0) {
      potencies.forEach(potency => {
        packSizes.forEach(packSize => {
          // Check if variation already exists
          const existingVariation = variations.find(
            v => v.potency === potency && v.packSize === packSize
          );
          
          if (existingVariation) {
            newVariations.push(existingVariation);
          } else {
            newVariations.push({
              potency,
              packSize,
              price: form.getValues("price") || 0,
              stock: 0,
              weight: baseWeight
            });
          }
        });
      });
    } 
    // If only potencies exist
    else if (potencies.length > 0) {
      potencies.forEach(potency => {
        // Check if variation already exists
        const existingVariation = variations.find(
          v => v.potency === potency && v.packSize === ""
        );
        
        if (existingVariation) {
          newVariations.push(existingVariation);
        } else {
          newVariations.push({
            potency,
            packSize: "",
            price: form.getValues("price") || 0,
            stock: 0,
            weight: baseWeight
          });
        }
      });
    } 
    // If only pack sizes exist
    else if (packSizes.length > 0) {
      packSizes.forEach(packSize => {
        // Check if variation already exists
        const existingVariation = variations.find(
          v => v.potency === "" && v.packSize === packSize
        );
        
        if (existingVariation) {
          newVariations.push(existingVariation);
        } else {
          newVariations.push({
            potency: "",
            packSize,
            price: form.getValues("price") || 0,
            stock: 0,
            weight: baseWeight
          });
        }
      });
    }
    
    setVariations(newVariations);
    form.setValue("variations", newVariations);
  }, [form, variations]);

  const handleAddPotency = useCallback((newPotency: string) => {
    if (newPotency && !potencyValues.includes(newPotency)) {
      const updatedPotencies = [...potencyValues, newPotency];
      setPotencyValues(updatedPotencies);
      form.setValue("potencies", updatedPotencies);
      
      // Generate variations with the updated potencies
      generateVariations(updatedPotencies, packSizeValues);
      return true;
    }
    return false;
  }, [potencyValues, packSizeValues, form, generateVariations]);

  const handleAddPackSize = useCallback((newPackSize: string) => {
    if (newPackSize && !packSizeValues.includes(newPackSize)) {
      const updatedPackSizes = [...packSizeValues, newPackSize];
      setPackSizeValues(updatedPackSizes);
      form.setValue("packSizes", updatedPackSizes);
      
      // Generate variations with the updated pack sizes
      generateVariations(potencyValues, updatedPackSizes);
      return true;
    }
    return false;
  }, [potencyValues, packSizeValues, form, generateVariations]);

  const handleRemovePotency = useCallback((value: string) => {
    const updatedPotencies = potencyValues.filter(p => p !== value);
    setPotencyValues(updatedPotencies);
    form.setValue("potencies", updatedPotencies);
    
    // If we're removing the last potency and there are no pack sizes, clear all variations
    if (updatedPotencies.length === 0 && packSizeValues.length === 0) {
      setVariations([]);
      form.setValue("variations", []);
      return;
    }
    
    // Update variations to remove ones that contain this potency
    const updatedVariations = variations.filter(v => v.potency !== value);
    setVariations(updatedVariations);
    form.setValue("variations", updatedVariations);
  }, [potencyValues, packSizeValues, variations, form]);

  const handleRemovePackSize = useCallback((value: string) => {
    const updatedPackSizes = packSizeValues.filter(p => p !== value);
    setPackSizeValues(updatedPackSizes);
    form.setValue("packSizes", updatedPackSizes);
    
    // If we're removing the last pack size and there are no potencies, clear all variations
    if (updatedPackSizes.length === 0 && potencyValues.length === 0) {
      setVariations([]);
      form.setValue("variations", []);
      return;
    }
    
    // Update variations to remove ones that contain this pack size
    const updatedVariations = variations.filter(v => v.packSize !== value);
    setVariations(updatedVariations);
    form.setValue("variations", updatedVariations);
  }, [packSizeValues, potencyValues, variations, form]);

  const handleUpdateVariation = useCallback((index: number, field: keyof ProductVariation, value: number) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { ...updatedVariations[index], [field]: value };
    setVariations(updatedVariations);
    form.setValue("variations", updatedVariations);
  }, [variations, form]);

  const setInitialVariations = useCallback((potencies: string[], packSizes: string[], initialVariations: ProductVariation[]) => {
    setPotencyValues(potencies);
    setPackSizeValues(packSizes);
    setVariations(initialVariations);
  }, []);

  return {
    potencyValues,
    packSizeValues,
    variations,
    handleAddPotency,
    handleAddPackSize,
    handleRemovePotency,
    handleRemovePackSize,
    handleUpdateVariation,
    setInitialVariations
  };
};
