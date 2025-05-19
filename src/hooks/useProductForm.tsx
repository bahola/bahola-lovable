
import { useState } from 'react';
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

export const useProductForm = (onProductAdded?: (product?: any) => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [potencyValues, setPotencyValues] = useState<string[]>([]);
  const [packSizeValues, setPackSizeValues] = useState<string[]>([]);
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const productType = form.watch("type");

  const onSubmit = async (values: ProductFormSchema) => {
    try {
      setIsSubmitting(true);
      
      // Add variations if product type is variable
      if (values.type === "variable") {
        values.variations = variations;
      }
      
      console.log("Saving product with data:", values);
      
      // Format dimensions as a string for storage
      const dimensionsFormatted = `${values.dimensions.length}/${values.dimensions.width}/${values.dimensions.height}`;
      
      // Set category to null if empty
      const categoryId = values.category && values.category !== "" ? values.category : null;
      
      // Prepare the product data for insertion
      const productData = {
        name: values.name,
        type: values.type,
        description: values.description,
        hsn_code: values.hsnCode,
        price: values.price,
        stock: values.type === 'simple' ? 0 : null, // Default stock for simple products
        weight: values.weight,
        dimensions: dimensionsFormatted,
        category_id: categoryId,
        pack_sizes: values.type === 'variable' ? values.packSizes : null,
        potencies: values.type === 'variable' ? values.potencies : null
      };
      
      // Insert the product into Supabase
      const { data: newProduct, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
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
      
      // Display success message
      toast({
        title: "Product saved successfully",
        description: `The product "${values.name}" has been added to your inventory.`,
      });
      
      // Call the callback if provided
      if (onProductAdded) {
        onProductAdded(newProduct);
      }
      
      // Reset form
      form.reset(defaultValues);
      setVariations([]);
      setPotencyValues([]);
      setPackSizeValues([]);
      setImageUrls([]);
      setActiveTab("general");
      
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Failed to save product",
        description: error instanceof Error ? error.message : "There was an error saving your product. Please try again.",
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
