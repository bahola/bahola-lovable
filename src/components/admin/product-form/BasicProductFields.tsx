
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Hash, FileText } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface BasicProductFieldsProps {
  form: UseFormReturn<any>;
}

const BasicProductFields = ({ form }: BasicProductFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default BasicProductFields;
