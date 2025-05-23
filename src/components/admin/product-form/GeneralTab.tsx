
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UseFormReturn } from 'react-hook-form';
import BasicProductFields from './BasicProductFields';
import CategorySelector from './CategorySelector';
import PriceInventoryFields from './PriceInventoryFields';
import TaxFields from './TaxFields';

interface GeneralTabProps {
  form: UseFormReturn<any>;
}

const GeneralTab = ({ form }: GeneralTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Basic product information including name, price, and tax details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Product Information Fields */}
        <BasicProductFields form={form} />
        
        {/* Category and Subcategory Selection */}
        <CategorySelector form={form} />
        
        {/* Price and Inventory Fields */}
        <PriceInventoryFields form={form} />
        
        {/* Tax Information Fields */}
        <TaxFields form={form} />
      </CardContent>
    </Card>
  );
};

export default GeneralTab;
