import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";

import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductVariation } from "@/types/product";

// Import the refactored tab components
import GeneralTab from './product-form/GeneralTab';
import ShippingTab from './product-form/ShippingTab';
import LinkedProductsTab from './product-form/LinkedProductsTab';
import AttributesTab from './product-form/AttributesTab';
import VariationsTab from './product-form/VariationsTab';
import DescriptionsTab from './product-form/DescriptionsTab';

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
  })).optional(),
  upsellProducts: z.array(z.string()).optional(),
  crossSellProducts: z.array(z.string()).optional(),
});

const ProductForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [potencyValues, setPotencyValues] = useState<string[]>([]);
  const [packSizeValues, setPackSizeValues] = useState<string[]>([]);
  const [newPotency, setNewPotency] = useState("");
  const [newPackSize, setNewPackSize] = useState("");
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const productType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Add variations if product type is variable
      if (values.type === "variable") {
        values.variations = variations;
      }
      
      console.log("Saving product with data:", values);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real application, you would send this data to your API
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // const data = await response.json();
      
      // Display success message
      toast({
        title: "Product saved successfully",
        description: `The product "${values.name}" has been added to your inventory.`,
      });
      
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
        description: "There was an error saving your product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPotency = () => {
    if (newPotency && !potencyValues.includes(newPotency)) {
      const updatedPotencies = [...potencyValues, newPotency];
      setPotencyValues(updatedPotencies);
      form.setValue("potencies", updatedPotencies);
      setNewPotency("");
      
      // Generate variations with the updated potencies
      generateVariations(updatedPotencies, packSizeValues);
    }
  };

  const handleAddPackSize = () => {
    if (newPackSize && !packSizeValues.includes(newPackSize)) {
      const updatedPackSizes = [...packSizeValues, newPackSize];
      setPackSizeValues(updatedPackSizes);
      form.setValue("packSizes", updatedPackSizes);
      setNewPackSize("");
      
      // Generate variations with the updated pack sizes
      generateVariations(potencyValues, updatedPackSizes);
    }
  };

  const generateVariations = (potencies: string[], packSizes: string[]) => {
    const newVariations: ProductVariation[] = [];
    
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
              stock: 0
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
            stock: 0
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
            stock: 0
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="linked">Linked Products</TabsTrigger>
            <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <GeneralTab form={form} />
          </TabsContent>

          {/* Attributes Tab */}
          <TabsContent value="attributes">
            <AttributesTab 
              productType={productType}
              potencyValues={potencyValues}
              packSizeValues={packSizeValues}
              newPotency={newPotency}
              newPackSize={newPackSize}
              setNewPotency={setNewPotency}
              setNewPackSize={setNewPackSize}
              handleAddPotency={handleAddPotency}
              handleAddPackSize={handleAddPackSize}
              handleRemovePotency={handleRemovePotency}
              handleRemovePackSize={handleRemovePackSize}
            />
          </TabsContent>
          
          {/* Variations Tab */}
          <TabsContent value="variations">
            <VariationsTab 
              productType={productType}
              potencyValues={potencyValues}
              packSizeValues={packSizeValues}
              variations={variations}
              handleUpdateVariation={handleUpdateVariation}
            />
          </TabsContent>

          {/* Shipping Tab - moved after Variations */}
          <TabsContent value="shipping">
            <ShippingTab form={form} />
          </TabsContent>

          {/* Linked Products Tab */}
          <TabsContent value="linked">
            <LinkedProductsTab form={form} />
          </TabsContent>

          {/* Descriptions Tab */}
          <TabsContent value="descriptions">
            <DescriptionsTab 
              form={form}
              imageUrls={imageUrls}
              handleAddImage={handleAddImage}
              handleChangeImage={handleChangeImage}
              handleRemoveImage={handleRemoveImage}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
