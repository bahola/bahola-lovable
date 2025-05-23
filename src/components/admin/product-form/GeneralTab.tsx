import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Hash, Layers, FileText } from 'lucide-react';
import { initialCategories } from '../CategorySelect';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';

interface GeneralTabProps {
  form: UseFormReturn<any>;
}

// Define subcategory type
interface Subcategory {
  id: string;
  name: string;
}

// Health concerns from Shop by Concern mega menu
const healthConcerns = [
  'Allergies', 'Cancer', 'Heart Health', 'Child Care', 
  'Ear Nose Throat', 'Eye Care', 'Gut Health', 'Womens Care',
  'Hair Care', 'Immune boosters', 'Infection', 'Lifestyle',
  'Muscle & Joint Care', 'Mental health', 'Nutritive', 'Pain Care',
  'Reproductive care', 'Respiratory Care', 'Skin Care', 'Tooth Care',
  'Urinary care'
];

const GeneralTab = ({ form }: GeneralTabProps) => {
  const [categories, setCategories] = useState(initialCategories);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const selectedCategory = form.watch("category");

  // Find the "Specialty Combinations" category
  const specialtyCombinationsCategory = categories.find(cat => 
    cat.name.toLowerCase().includes('specialty') || 
    cat.name.toLowerCase().includes('combination')
  );

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        return;
      }

      // If it's the Specialty Combinations category, use health concerns
      if (specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id) {
        const concernSubcategories = healthConcerns.map((concern, index) => ({
          id: concern.toLowerCase().replace(/\s+/g, '-'),
          name: concern
        }));
        setSubcategories(concernSubcategories);
        return;
      }

      // Otherwise, fetch from database as before
      setIsLoadingSubcategories(true);
      try {
        const { data, error } = await supabase
          .from('product_subcategories')
          .select('id, name')
          .eq('category_id', selectedCategory);

        if (error) {
          console.error('Error fetching subcategories:', error);
          return;
        }

        setSubcategories(data || []);
      } catch (error) {
        console.error('Error in fetchSubcategories:', error);
      } finally {
        setIsLoadingSubcategories(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategory, specialtyCombinationsCategory]);

  return (
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

        {/* Short Description Field */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> 
                  Short Description
                </span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter a brief description" 
                  className="resize-none" 
                  rows={2}
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A brief summary of the product for product listings and search results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Selection as Dropdown */}
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
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset subcategory when category changes
                  form.setValue("subcategory", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a category for your product. Categories help organize products and improve SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subcategory Selection - Only shown when a category is selected */}
        {selectedCategory && (
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center">
                    <Layers className="h-4 w-4 mr-1" /> 
                    Subcategory
                    {specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id && (
                      <span className="ml-2 text-sm text-muted-foreground">(Health Concerns)</span>
                    )}
                  </span>
                </FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={isLoadingSubcategories || subcategories.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={
                        isLoadingSubcategories 
                          ? "Loading subcategories..." 
                          : subcategories.length === 0 
                            ? "No subcategories available" 
                            : specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id
                              ? "Select a health concern"
                              : "Select a subcategory"
                      } />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id 
                    ? "Select a health concern for your specialty combination product."
                    : "Select a subcategory to further classify your product."
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        
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

        {form.watch("type") === "simple" && (
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
  );
};

export default GeneralTab;
