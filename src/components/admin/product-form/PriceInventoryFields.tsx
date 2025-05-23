
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Hash } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface PriceInventoryFieldsProps {
  form: UseFormReturn<any>;
}

const PriceInventoryFields = ({ form }: PriceInventoryFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default PriceInventoryFields;
