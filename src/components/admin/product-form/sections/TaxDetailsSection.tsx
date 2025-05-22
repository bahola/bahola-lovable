
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Hash } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface TaxDetailsSectionProps {
  form: UseFormReturn<any>;
}

const TaxDetailsSection = ({ form }: TaxDetailsSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default TaxDetailsSection;
