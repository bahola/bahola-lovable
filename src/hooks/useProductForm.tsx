
import { useState, useEffect, useCallback, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductVariations } from './product-form/useProductVariations';
import { useProductImages } from './product-form/useProductImages';
import { useProductSubmit } from './product-form/useProductSubmit';

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  type: z.enum(["simple", "variable"]),
  description: z.string(),
  shortDescription: z.string(),
  stock: z.number().optional(),
  hsnCode: z.string(),
  price: z.number().min(0),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  weight: z.number().min(0),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  taxStatus: z.enum(["taxable", "non-taxable"]),
  taxClass: z.enum(["0", "5", "12"]),
  potencies: z.array(z.string()).optional(),
  packSizes: z.array(z.string()).optional(),
  variations: z.array(z.object({
    potency: z.string(),
    packSize: z.string(),
    price: z.number().min(0),
    stock: z.number().min(0),
    weight: z.number().min(0),
  })).optional(),
  upsellProducts: z.array(z.string()).optional(),
  crossSellProducts: z.array(z.string()).optional(),
});

export type ProductFormSchema = z.infer<typeof formSchema>;

const defaultValues = {
  name: "",
  type: "simple" as const,
  description: "",
  shortDescription: "",
  stock: 0,
  hsnCode: "",
  price: 0,
  category: "",
  subcategory: "",
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  taxStatus: "taxable" as const,
  taxClass: "5" as const,
  potencies: [],
  packSizes: [],
  variations: [],
  upsellProducts: [],
  crossSellProducts: [],
};

export const useProductForm = (onProductAdded?: (product?: any) => void, initialProduct?: any, isEditing = false) => {
  const [activeTab, setActiveTab] = useState("general");
  const [productId, setProductId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize form with values from initialProduct if editing
  const getInitialValues = useCallback(() => {
    if (!initialProduct) return defaultValues;
    
    try {
      console.log('Setting up form with initial product:', initialProduct);
      
      // Parse dimensions string if exists
      let dimensionsObj = { length: 0, width: 0, height: 0 };
      if (initialProduct.dimensions) {
        try {
          const [length, width, height] = initialProduct.dimensions.split('/').map(Number);
          dimensionsObj = { length: isNaN(length) ? 0 : length, width: isNaN(width) ? 0 : width, height: isNaN(height) ? 0 : height };
        } catch (e) {
          console.error('Error parsing dimensions:', e);
        }
      }
      
      // Set product ID for editing
      setProductId(initialProduct.id);
      
      // Return formatted initial values with subcategory
      return {
        name: initialProduct.name || "",
        type: initialProduct.type || "simple",
        description: initialProduct.description || "",
        shortDescription: initialProduct.short_description || "",
        stock: initialProduct.stock || 0,
        hsnCode: initialProduct.hsn_code || "",
        price: initialProduct.price || 0,
        category: initialProduct.category_id || "",
        subcategory: initialProduct.subcategory_id || "",
        weight: initialProduct.weight || 0,
        dimensions: dimensionsObj,
        taxStatus: initialProduct.tax_status || "taxable",
        taxClass: initialProduct.tax_class || "5",
        potencies: initialProduct.potencies || [],
        packSizes: initialProduct.pack_sizes || [],
        variations: initialProduct.product_variations?.map((v: any) => ({
          potency: v.potency || '',
          packSize: v.pack_size || '',
          price: v.price || 0,
          stock: v.stock || 0,
          weight: v.weight || 0,
        })) || [],
        upsellProducts: initialProduct.upsell_products || [],
        crossSellProducts: initialProduct.cross_sell_products || [],
      };
    } catch (error) {
      console.error('Error initializing form with product data:', error);
      return defaultValues;
    }
  }, [initialProduct]);

  // Create form instance with initial values
  const initialValues = useMemo(() => getInitialValues(), [getInitialValues]);
  
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // Watch for product type changes
  const productType = form.watch("type");

  // Use our custom hooks
  const { 
    potencyValues, 
    packSizeValues, 
    variations, 
    handleAddPotency, 
    handleAddPackSize, 
    handleRemovePotency, 
    handleRemovePackSize, 
    handleUpdateVariation,
    setInitialVariations
  } = useProductVariations(form);

  const { 
    imageUrls, 
    handleAddImage, 
    handleChangeImage, 
    handleRemoveImage,
    setInitialImages
  } = useProductImages();

  const { 
    isSubmitting, 
    onSubmit: submitHandler 
  } = useProductSubmit({
    form,
    variations,
    onProductAdded,
    isEditing,
    productId
  });

  // Initialize state values from initialProduct only once
  useEffect(() => {
    if (!initialized && initialProduct && isEditing) {
      // Initialize state values
      const potencies = initialProduct.potencies || [];
      const packSizes = initialProduct.pack_sizes || [];
      const imageUrlsValue = initialProduct.image ? [initialProduct.image] : [];
      
      setInitialVariations(
        potencies, 
        packSizes, 
        initialProduct.product_variations?.map((v: any) => ({
          potency: v.potency || '',
          packSize: v.pack_size || '',
          price: v.price || 0,
          stock: v.stock || 0,
          weight: v.weight || 0,
        })) || []
      );
      
      setInitialImages(imageUrlsValue);
      setInitialized(true);
    }
  }, [initialProduct, isEditing, initialized, setInitialVariations, setInitialImages]);

  // Wrap submitHandler to handle form reset
  const onSubmit = useCallback(async (values: ProductFormSchema) => {
    const result = await submitHandler(values);
    
    if (result && !isEditing) {
      // Reset form only for new products
      form.reset(defaultValues);
      setInitialVariations([], [], []);
      setInitialImages([]);
      setActiveTab("general");
    }
  }, [submitHandler, isEditing, form, setInitialVariations, setInitialImages]);

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
};
