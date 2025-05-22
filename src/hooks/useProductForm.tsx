
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormValues, productFormSchema, defaultValues } from './product-form/productFormSchema';
import { useProductFormInitialization } from './product-form/useProductFormInitialization';
import { useProductImages } from './product-form/useProductImages';
import { useProductAttributes } from './product-form/useProductAttributes';
import { useProductVariations } from './product-form/useProductVariations';
import { useProductSubmission } from './product-form/useProductSubmission';

export function useProductForm(
  onProductAdded?: (product?: any) => void,
  initialProduct?: any,
  isEditing = false
) {
  // Get initial values first
  const {
    productId,
    setProductId,
    imageUrls: initialImageUrls,
    setImageUrls: setInitialImageUrls,
    getInitialValues
  } = useProductFormInitialization(initialProduct);

  // Form initialization with validation
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialProduct ? getInitialValues(initialProduct) : defaultValues,
  });

  const [activeTab, setActiveTab] = useState('general');
  const productType = form.watch('type');

  // Reset form when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      form.reset(getInitialValues(initialProduct));
    }
  }, [initialProduct, form, getInitialValues]);

  const {
    imageUrls,
    setImageUrls,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage
  } = useProductImages(initialImageUrls);

  const {
    potencyValues,
    packSizeValues,
    handleAddPotency,
    handleRemovePotency,
    handleAddPackSize,
    handleRemovePackSize
  } = useProductAttributes(form);

  const {
    variations,
    handleUpdateVariation
  } = useProductVariations(form, productType, potencyValues, packSizeValues);

  const {
    isSubmitting,
    onSubmit
  } = useProductSubmission(form, productId, imageUrls, setActiveTab, onProductAdded, isEditing);

  // Sync imageUrls between hooks only when initialImageUrls changes
  useEffect(() => {
    // Only update if initial images have changed and are different 
    // from the current imageUrls to prevent infinite loops
    if (initialImageUrls && initialImageUrls.length > 0) {
      const initialUrlsString = JSON.stringify(initialImageUrls);
      const currentUrlsString = JSON.stringify(imageUrls);
      
      if (initialUrlsString !== currentUrlsString) {
        setImageUrls(initialImageUrls);
      }
    }
  }, [initialImageUrls, imageUrls, setImageUrls]);

  return {
    form,
    activeTab,
    setActiveTab,
    isSubmitting,
    productType,
    potencyValues,
    packSizeValues,
    variations,
    imageUrls,
    onSubmit,
    handleAddPotency,
    handleAddPackSize,
    handleRemovePotency,
    handleRemovePackSize,
    handleUpdateVariation,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage,
  };
}
