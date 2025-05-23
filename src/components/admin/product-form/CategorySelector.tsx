import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';

// Define interfaces
interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
}

// Health concerns for Specialty Combinations
const healthConcerns = [
  'Allergies', 'Cancer', 'Heart Health', 'Child Care', 
  'Ear Nose Throat', 'Eye Care', 'Gut Health', 'Womens Care',
  'Hair Care', 'Immune boosters', 'Infection', 'Lifestyle',
  'Muscle & Joint Care', 'Mental health', 'Nutritive', 'Pain Care',
  'Reproductive care', 'Respiratory Care', 'Skin Care', 'Tooth Care',
  'Urinary care'
];

// Alphabet subcategories for category-based products
const alphabetSubcategories = Array.from({ length: 26 }, (_, i) => ({
  id: String.fromCharCode(65 + i).toLowerCase(),
  name: String.fromCharCode(65 + i)
}));

interface CategorySelectorProps {
  form: UseFormReturn<any>;
}

const CategorySelector = ({ form }: CategorySelectorProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const selectedCategory = form.watch("category");

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('id, name')
          .order('name');

        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }

        setCategories(data || []);
      } catch (error) {
        console.error('Error in fetchCategories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Find specific categories by name
  const specialtyCombinationsCategory = categories.find(cat => 
    cat.name.toLowerCase().includes('specialty') && cat.name.toLowerCase().includes('combination')
  );

  const motherTincturesCategory = categories.find(cat => 
    cat.name.toLowerCase().includes('mother') && cat.name.toLowerCase().includes('tincture')
  );

  const dilutionsCategory = categories.find(cat => 
    cat.name.toLowerCase().includes('dilution')
  );

  const lmPotenciesCategory = categories.find(cat => 
    cat.name.toLowerCase().includes('lm') && cat.name.toLowerCase().includes('potenc')
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
        const concernSubcategories = healthConcerns.map((concern) => ({
          id: concern.toLowerCase().replace(/\s+/g, '-'),
          name: concern
        }));
        setSubcategories(concernSubcategories);
        return;
      }

      // If it's Mother Tinctures, Dilutions, or LM Potencies, use alphabet
      if ((motherTincturesCategory && selectedCategory === motherTincturesCategory.id) ||
          (dilutionsCategory && selectedCategory === dilutionsCategory.id) ||
          (lmPotenciesCategory && selectedCategory === lmPotenciesCategory.id)) {
        setSubcategories(alphabetSubcategories);
        return;
      }

      // Otherwise, fetch from database
      setIsLoadingSubcategories(true);
      try {
        const { data, error } = await supabase
          .from('product_subcategories')
          .select('id, name')
          .eq('category_id', selectedCategory)
          .order('name');

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
  }, [selectedCategory, specialtyCombinationsCategory, motherTincturesCategory, dilutionsCategory, lmPotenciesCategory]);

  // Helper functions for UI text
  const getSubcategoryLabel = () => {
    if (specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id) {
      return "(Health Concerns)";
    }
    if ((motherTincturesCategory && selectedCategory === motherTincturesCategory.id) ||
        (dilutionsCategory && selectedCategory === dilutionsCategory.id) ||
        (lmPotenciesCategory && selectedCategory === lmPotenciesCategory.id)) {
      return "(Alphabetical)";
    }
    return "";
  };

  const getPlaceholderText = () => {
    if (isLoadingSubcategories) return "Loading subcategories...";
    if (subcategories.length === 0) return "No subcategories available";
    
    if (specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id) {
      return "Select a health concern";
    }
    if ((motherTincturesCategory && selectedCategory === motherTincturesCategory.id) ||
        (dilutionsCategory && selectedCategory === dilutionsCategory.id) ||
        (lmPotenciesCategory && selectedCategory === lmPotenciesCategory.id)) {
      return "Select a letter";
    }
    return "Select a subcategory";
  };

  const getDescriptionText = () => {
    if (specialtyCombinationsCategory && selectedCategory === specialtyCombinationsCategory.id) {
      return "Select a health concern for your specialty combination product.";
    }
    if ((motherTincturesCategory && selectedCategory === motherTincturesCategory.id) ||
        (dilutionsCategory && selectedCategory === dilutionsCategory.id) ||
        (lmPotenciesCategory && selectedCategory === lmPotenciesCategory.id)) {
      return "Select the first letter of your product name for alphabetical organization.";
    }
    return "Select a subcategory to further classify your product.";
  };

  return (
    <>
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
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Reset subcategory when category changes
                form.setValue("subcategory", "");
              }}
              value={field.value || ""}
              disabled={isLoadingCategories}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select a category"} />
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
                  {getSubcategoryLabel() && (
                    <span className="ml-2 text-sm text-muted-foreground">{getSubcategoryLabel()}</span>
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
                    <SelectValue placeholder={getPlaceholderText()} />
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
                {getDescriptionText()}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CategorySelector;
