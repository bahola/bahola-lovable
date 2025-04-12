
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Box, 
  Package, 
  Hash, 
  Truck, 
  Link, 
  ArrowUp, 
  ArrowRight, 
  List, 
  FileText,
  Image as ImageIcon,
  Plus,
  X,
  PencilLine,
  Layers
} from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, ProductVariation } from "@/types/product";
import CategorySelect from './CategorySelect';

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
  const [activeTab, setActiveTab] = useState("general");
  const [potencyValues, setPotencyValues] = useState<string[]>([]);
  const [packSizeValues, setPackSizeValues] = useState<string[]>([]);
  const [newPotency, setNewPotency] = useState("");
  const [newPackSize, setNewPackSize] = useState("");
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const defaultValues: z.infer<typeof formSchema> = {
    name: "",
    type: "simple",
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
    taxStatus: "taxable",
    taxClass: "5",
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Add variations if product type is variable
    if (values.type === "variable") {
      values.variations = variations;
    }
    
    console.log("Form values:", values);
    // This is where you'd typically send the data to an API
    // For now, we'll just log it
  };

  const handleAddPotency = () => {
    if (newPotency && !potencyValues.includes(newPotency)) {
      const updatedPotencies = [...potencyValues, newPotency];
      setPotencyValues(updatedPotencies);
      form.setValue("potencies", updatedPotencies);
      setNewPotency("");
      
      // Generate variations if both potencies and packSizes exist
      if (packSizeValues.length > 0) {
        generateVariations(updatedPotencies, packSizeValues);
      }
    }
  };

  const handleAddPackSize = () => {
    if (newPackSize && !packSizeValues.includes(newPackSize)) {
      const updatedPackSizes = [...packSizeValues, newPackSize];
      setPackSizeValues(updatedPackSizes);
      form.setValue("packSizes", updatedPackSizes);
      setNewPackSize("");
      
      // Generate variations if both potencies and packSizes exist
      if (potencyValues.length > 0) {
        generateVariations(potencyValues, updatedPackSizes);
      }
    }
  };

  const generateVariations = (potencies: string[], packSizes: string[]) => {
    const newVariations: ProductVariation[] = [];
    
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
    
    setVariations(newVariations);
    form.setValue("variations", newVariations);
  };

  const handleRemovePotency = (value: string) => {
    const updatedPotencies = potencyValues.filter(p => p !== value);
    setPotencyValues(updatedPotencies);
    form.setValue("potencies", updatedPotencies);
    
    // Remove variations that contain this potency
    const updatedVariations = variations.filter(v => v.potency !== value);
    setVariations(updatedVariations);
    form.setValue("variations", updatedVariations);
  };

  const handleRemovePackSize = (value: string) => {
    const updatedPackSizes = packSizeValues.filter(p => p !== value);
    setPackSizeValues(updatedPackSizes);
    form.setValue("packSizes", updatedPackSizes);
    
    // Remove variations that contain this pack size
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

  // Mock product data for upsells and cross-sells
  const mockProducts = [
    { id: "1", name: "Arnica Montana 30C" },
    { id: "2", name: "Belladonna 6X" },
    { id: "3", name: "Nux Vomica 200C" },
    { id: "4", name: "Bryonia Alba 30C" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="linked">Linked Products</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Basic product information including name, price, and tax details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category Selection */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center">
                          <Layers className="h-4 w-4 mr-1" /> 
                          Category
                        </span>
                      </FormLabel>
                      <FormControl>
                        <CategorySelect 
                          selectedCategory={field.value || ""}
                          onCategoryChange={(categoryId) => field.onChange(categoryId)}
                        />
                      </FormControl>
                      <FormDescription>
                        Select a category for your product or create a new one. Categories help organize products and improve SEO.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="simple">Simple</SelectItem>
                          <SelectItem value="variable">Variable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        A simple product has one price, a variable product can have different variations with different prices.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Price (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hsnCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center">
                          <Hash className="h-4 w-4 mr-1" /> 
                          HSN Code
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter HSN code" {...field} />
                      </FormControl>
                      <FormDescription>
                        Harmonized System Nomenclature code for the product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="taxStatus"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Tax Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="taxable" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Taxable
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="non-taxable" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Non-taxable
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Class</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={form.watch("taxStatus") === "non-taxable"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tax class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" /> 
                    Shipping Information
                  </span>
                </CardTitle>
                <CardDescription>
                  Specify product weight and dimensions for shipping calculations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (grams)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dimensions.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensions.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Linked Products Tab */}
          <TabsContent value="linked">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center">
                    <Link className="h-5 w-5 mr-2" /> 
                    Linked Products
                  </span>
                </CardTitle>
                <CardDescription>
                  Associate this product with others to increase sales.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 mr-2" />
                    <h3 className="text-md font-medium">Upsells</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upsells are products that you promote instead of the currently viewed product.
                  </p>
                  
                  <div className="border rounded-md p-4">
                    {mockProducts.map(product => (
                      <div key={product.id} className="flex items-center space-x-2 mb-2">
                        <Checkbox id={`upsell-${product.id}`} />
                        <label 
                          htmlFor={`upsell-${product.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {product.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    <h3 className="text-md font-medium">Cross-sells</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cross-sells are products that you promote in the cart based on the current product.
                  </p>
                  
                  <div className="border rounded-md p-4">
                    {mockProducts.map(product => (
                      <div key={product.id} className="flex items-center space-x-2 mb-2">
                        <Checkbox id={`cross-sell-${product.id}`} />
                        <label 
                          htmlFor={`cross-sell-${product.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {product.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attributes Tab */}
          <TabsContent value="attributes">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center">
                    <List className="h-5 w-5 mr-2" /> 
                    Product Attributes
                  </span>
                </CardTitle>
                <CardDescription>
                  Define attributes like potency and pack size to create product variations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enable Attributes Switch */}
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={productType === "variable"} 
                    disabled 
                    id="attributes-mode"
                  />
                  <label
                    htmlFor="attributes-mode"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {productType === "variable" 
                      ? "Attributes enabled (Variable product)" 
                      : "Attributes disabled (Simple product)"}
                  </label>
                </div>

                <div className={productType !== "variable" ? "opacity-50 pointer-events-none" : ""}>
                  {/* Potency Attribute */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-2">Potency</h3>
                    <div className="flex items-end gap-2 mb-2">
                      <div className="flex-1">
                        <Input 
                          value={newPotency} 
                          onChange={(e) => setNewPotency(e.target.value)}
                          placeholder="Ex: 30C, 200C, 1M"
                        />
                      </div>
                      <Button 
                        type="button" 
                        onClick={handleAddPotency}
                        disabled={!newPotency}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {potencyValues.map((potency, index) => (
                        <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-md">
                          <span className="mr-2">{potency}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0"
                            onClick={() => handleRemovePotency(potency)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pack Size Attribute */}
                  <div>
                    <h3 className="text-md font-medium mb-2">Pack Size</h3>
                    <div className="flex items-end gap-2 mb-2">
                      <div className="flex-1">
                        <Input 
                          value={newPackSize} 
                          onChange={(e) => setNewPackSize(e.target.value)}
                          placeholder="Ex: 10g, 30ml, 100 pills"
                        />
                      </div>
                      <Button 
                        type="button" 
                        onClick={handleAddPackSize}
                        disabled={!newPackSize}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {packSizeValues.map((packSize, index) => (
                        <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-md">
                          <span className="mr-2">{packSize}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0"
                            onClick={() => handleRemovePackSize(packSize)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Variations Tab */}
          <TabsContent value="variations">
            <Card>
              <CardHeader>
                <CardTitle>Product Variations</CardTitle>
                <CardDescription>
                  Manage prices and stock for different product variations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {productType !== "variable" ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      Variations are only available for variable products. 
                      Change the product type to "Variable" in the General tab.
                    </p>
                  </div>
                ) : potencyValues.length === 0 || packSizeValues.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      Please add at least one potency and one pack size in the Attributes tab 
                      to generate variations.
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Potency
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Pack Size
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Price (₹)
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Stock
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {variations.map((variation, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                              {variation.potency}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              {variation.packSize}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              <Input 
                                type="number"
                                value={variation.price}
                                onChange={(e) => handleUpdateVariation(
                                  index, 
                                  "price", 
                                  parseFloat(e.target.value) || 0
                                )}
                                className="w-24"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              <Input 
                                type="number"
                                value={variation.stock}
                                onChange={(e) => handleUpdateVariation(
                                  index, 
                                  "stock", 
                                  parseInt(e.target.value) || 0
                                )}
                                className="w-24"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Descriptions Tab */}
          <TabsContent value="descriptions">
            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" /> 
                    Product Descriptions
                  </span>
                </CardTitle>
                <CardDescription>
                  Add detailed descriptions and images for your product.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Short Description */}
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief product description (displayed in product lists)" 
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Add Images to Short Description</p>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline"
                        onClick={handleAddImage}
                      >
                        <ImageIcon className="h-4 w-4 mr-1" /> Add Image
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Image URL"
                            value={url}
                            onChange={(e) => handleChangeImage(index, e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed product description (displayed on product page)" 
                          className="resize-none min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include all relevant details about the product, such as benefits, instructions, and other important information.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
