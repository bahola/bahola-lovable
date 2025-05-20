
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { ProductVariation } from "@/types/product";

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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [potencyValues, setPotencyValues] = useState<string[]>([]);
  const [packSizeValues, setPackSizeValues] = useState<string[]>([]);
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [productId, setProductId] = useState<string | null>(null);

  // Initialize form with values from initialProduct if editing
  const getInitialValues = () => {
    if (!initialProduct) return defaultValues;
    
    try {
      console.log('Setting up form with initial product:', initialProduct);
      
      // Parse dimensions string if exists
      let dimensionsObj = { length: 0, width: 0, height: 0 };
      if (initialProduct.dimensions) {
        const [length, width, height] = initialProduct.dimensions.split('/').map(Number);
        dimensionsObj = { length, width, height };
      }
      
      // Set product ID for editing
      setProductId(initialProduct.id);
      
      // Set potencies and pack sizes
      if (initialProduct.potencies) {
        setPotencyValues(initialProduct.potencies);
      }
      
      if (initialProduct.pack_sizes) {
        setPackSizeValues(initialProduct.pack_sizes);
      }
      
      // Set variations if available
      if (initialProduct.variations) {
        const formattedVariations = initialProduct.variations.map((v: any) => ({
          potency: v.potency,
          packSize: v.pack_size,
          price: v.price,
          stock: v.stock || 0,
          weight: v.weight || 0,
        }));
        setVariations(formattedVariations);
      }
      
      // Set image URLs if available
      if (initialProduct.image) {
        setImageUrls([initialProduct.image]);
      }
      
      // Return formatted initial values
      return {
        name: initialProduct.name,
        type: initialProduct.type,
        description: initialProduct.description || "",
        shortDescription: initialProduct.short_description || "",
        stock: initialProduct.stock || 0,
        hsnCode: initialProduct.hsn_code,
        price: initialProduct.price,
        category: initialProduct.category_id || "",
        weight: initialProduct.weight,
        dimensions: dimensionsObj,
        taxStatus: initialProduct.tax_status || "taxable",
        taxClass: initialProduct.tax_class || "5",
        potencies: initialProduct.potencies || [],
        packSizes: initialProduct.pack_sizes || [],
        variations: formattedVariations || [],
        upsellProducts: initialProduct.upsell_products || [],
        crossSellProducts: initialProduct.cross_sell_products || [],
      };
    } catch (error) {
      console.error('Error initializing form with product data:', error);
      return defaultValues;
    }
  };

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
  });

  // Update form when initialProduct changes (in case it loads after component mount)
  useEffect(() => {
    if (initialProduct && isEditing) {
      const values = getInitialValues();
      form.reset(values);
    }
  }, [initialProduct, isEditing]);

  const productType = form.watch("type");

  const onSubmit = async (values: ProductFormSchema) => {
    try {
      setIsSubmitting(true);
      
      // Add variations if product type is variable
      if (values.type === "variable") {
        values.variations = variations;
      }
      
      console.log(`${isEditing ? 'Updating' : 'Saving'} product with data:`, values);
      
      // Format dimensions as a string for storage
      const dimensionsFormatted = `${values.dimensions.length}/${values.dimensions.width}/${values.dimensions.height}`;
      
      // Set category to null if empty
      const categoryId = values.category && values.category !== "" ? values.category : null;
      
      // Prepare the product data
      const productData = {
        name: values.name,
        type: values.type,
        description: values.description,
        hsn_code: values.hsnCode,
        price: values.price,
        stock: values.type === 'simple' ? values.stock : null, // Stock for simple products
        weight: values.weight,
        dimensions: dimensionsFormatted,
        category_id: categoryId,
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
      
      if (!isEditing) {
        // Reset form only for new products
        form.reset(defaultValues);
        setVariations([]);
        setPotencyValues([]);
        setPackSizeValues([]);
        setImageUrls([]);
        setActiveTab("general");
      }
      
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'saving'} product:`, error);
      toast({
        title: `Failed to ${isEditing ? 'update' : 'save'} product`,
        description: error instanceof Error ? error.message : `There was an error ${isEditing ? 'updating' : 'saving'} your product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPotency = (newPotency: string) => {
    if (newPotency && !potencyValues.includes(newPotency)) {
      const updatedPotencies = [...potencyValues, newPotency];
      setPotencyValues(updatedPotencies);
      form.setValue("potencies", updatedPotencies);
      
      // Generate variations with the updated potencies
      generateVariations(updatedPotencies, packSizeValues);
      return true;
    }
    return false;
  };

  const handleAddPackSize = (newPackSize: string) => {
    if (newPackSize && !packSizeValues.includes(newPackSize)) {
      const updatedPackSizes = [...packSizeValues, newPackSize];
      setPackSizeValues(updatedPackSizes);
      form.setValue("packSizes", updatedPackSizes);
      
      // Generate variations with the updated pack sizes
      generateVariations(potencyValues, updatedPackSizes);
      return true;
    }
    return false;
  };

  const generateVariations = (potencies: string[], packSizes: string[]) => {
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
  };

  const handleRemovePotency = (value: string) => {
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
  };

  const handleRemovePackSize = (value: string) => {
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
  };

  const handleUpdateVariation = (index: number, field: keyof ProductVariation, value: number) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { ...updatedVariations[index], [field]: value };
    setVariations(updatedVariations);
    form.setValue("variations", updatedVariations);
  };

  const handleAddImage = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleChangeImage = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const handleRemoveImage = (index: number) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
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
    handleAddPackSize,
    handleRemovePotency,
    handleRemovePackSize,
    handleUpdateVariation,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage,
  };
};
