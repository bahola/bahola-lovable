
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
}

const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
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
    </>
  );
};

export default BasicInfoSection;
