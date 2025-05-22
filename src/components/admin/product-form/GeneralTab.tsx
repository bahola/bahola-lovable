
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UseFormReturn } from 'react-hook-form';

// Import the new section components
import BasicInfoSection from './sections/BasicInfoSection';
import CategorySection from './sections/CategorySection';
import ProductTypeSection from './sections/ProductTypeSection';
import TaxDetailsSection from './sections/TaxDetailsSection';

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
        {/* Basic Information */}
        <BasicInfoSection form={form} />
        
        {/* Category and Subcategory */}
        <CategorySection form={form} />
        
        {/* Product Type, Price, Stock */}
        <ProductTypeSection form={form} />
        
        {/* Tax Details */}
        <TaxDetailsSection form={form} />
      </CardContent>
    </Card>
  );
};

export default GeneralTab;
