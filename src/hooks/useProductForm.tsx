
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProductVariation } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define the schema for product form validation
const productFormSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  type: z.enum(['simple', 'variable']),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().int().min(0).optional(),
  hsnCode: z.string().min(1, { message: 'HSN Code is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  weight: z.number().min(0, { message: 'Weight must be a positive number' }),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  taxStatus: z.enum(['taxable', 'none']),
  taxClass: z.string(),
  upsellProducts: z.array(z.string()).optional(),
  crossSellProducts: z.array(z.string()).optional(),
  potencies: z.array(z.string()).optional(),
  packSizes: z.array(z.string()).optional(),
  variations: z.array(
    z.object({
      potency: z.string(),
      packSize: z.string(),
      price: z.number().min(0),
      stock: z.number().int().min(0),
      weight: z.number().min(0),
    })
  ).optional(),
});

// Type definition inferred from the schema
type ProductFormValues = z.infer<typeof productFormSchema>;

// Default form values
const defaultValues: ProductFormValues = {
  name: '',
  type: 'simple',
  shortDescription: '',
  description: '',
  stock: 0,
  hsnCode: '',
  price: 0,
  category: '',
  subcategory: '',
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0
  },
  taxStatus: 'taxable',
  taxClass: '5',
  potencies: [],
  packSizes: [],
  variations: [],
  upsellProducts: [],
  crossSellProducts: [],
};

export function useProductForm(
  onProductAdded?: (product?: any) => void,
  initialProduct?: any,
  isEditing = false
) {
  // Form initialization with validation
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getInitialValues(),
  });

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const productType = form.watch('type');

  // Get potency and pack size values from the form
  const potencyValues = form.watch('potencies') || [];
  const packSizeValues = form.watch('packSizes') || [];
  const variations = form.watch('variations') || [];

  // Initialize form with product data if editing
  function getInitialValues() {
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
      
      // Set potencies and pack sizes if they exist
      const potencies = initialProduct.potencies || [];
      const packSizes = initialProduct.pack_sizes || [];
      
      // Set variations if available
      let formattedVariations: ProductVariation[] = [];
      if (initialProduct.product_variations && initialProduct.product_variations.length > 0) {
        formattedVariations = initialProduct.product_variations.map((v: any) => ({
          potency: v.potency || '',
          packSize: v.pack_size || '',
          price: v.price || 0,
          stock: v.stock || 0,
          weight: v.weight || 0,
        }));
      }
      
      // Set image URLs if available
      const imageUrlsValue = initialProduct.image ? [initialProduct.image] : [];
      setImageUrls(imageUrlsValue);
      
      // Return formatted initial values
      return {
        name: initialProduct.name || "",
        type: initialProduct.type || "simple",
        shortDescription: initialProduct.short_description || "",
        description: initialProduct.description || "",
        stock: initialProduct.stock || 0,
        hsnCode: initialProduct.hsn_code || "",
        price: initialProduct.price || 0,
        category: initialProduct.category_id || "",
        subcategory: initialProduct.subcategory_id || "", 
        weight: initialProduct.weight || 0,
        dimensions: dimensionsObj,
        taxStatus: initialProduct.tax_status || "taxable",
        taxClass: initialProduct.tax_class || "5",
        potencies: potencies,
        packSizes: packSizes,
        variations: formattedVariations,
        upsellProducts: initialProduct.upsell_products || [],
        crossSellProducts: initialProduct.cross_sell_products || [],
      };
    } catch (error) {
      console.error('Error initializing form with product data:', error);
      return defaultValues;
    }
  }

  // Reset form when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      form.reset(getInitialValues());
    }
  }, [initialProduct]);

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
        setProductId(product.id);
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

  // Handle potency and pack size operations
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

  // Handle variations update
  const handleUpdateVariation = (index: number, field: keyof ProductVariation, value: any) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { 
      ...updatedVariations[index], 
      [field]: value 
    };
    form.setValue('variations', updatedVariations);
  };

  // Handle image operations
  const handleAddImage = (url: string) => {
    setImageUrls([...imageUrls, url]);
  };

  const handleChangeImage = (index: number, url: string) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = url;
    setImageUrls(updatedUrls);
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

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
    onSubmit: form.handleSubmit(onSubmit),
    handleAddPotency,
    handleRemovePotency,
    handleAddPackSize,
    handleRemovePackSize,
    handleUpdateVariation,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage,
  };
}
