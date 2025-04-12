
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, ArrowUp, ArrowRight } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { initialCategories } from '../CategorySelect';

interface LinkedProductsTabProps {
  form: UseFormReturn<any>;
}

const LinkedProductsTab = ({ form }: LinkedProductsTabProps) => {
  // Mock product data for upsells and cross-sells
  const mockProducts = [
    { id: "1", name: "Arnica Montana 30C" },
    { id: "2", name: "Belladonna 6X" },
    { id: "3", name: "Nux Vomica 200C" },
    { id: "4", name: "Bryonia Alba 30C" },
  ];

  // Set up the form fields for linked products if they don't exist
  useEffect(() => {
    const currentUpsells = form.getValues("upsellProducts") || [];
    const currentCrossSells = form.getValues("crossSellProducts") || [];
    
    if (!currentUpsells.length) {
      form.setValue("upsellProducts", []);
    }
    
    if (!currentCrossSells.length) {
      form.setValue("crossSellProducts", []);
    }
  }, [form]);

  const handleUpsellChange = (checked: boolean | string, productId: string) => {
    const currentUpsells = form.getValues("upsellProducts") || [];
    
    if (checked) {
      if (!currentUpsells.includes(productId)) {
        form.setValue("upsellProducts", [...currentUpsells, productId]);
      }
    } else {
      form.setValue("upsellProducts", currentUpsells.filter(id => id !== productId));
    }
  };

  const handleCrossSellChange = (checked: boolean | string, productId: string) => {
    const currentCrossSells = form.getValues("crossSellProducts") || [];
    
    if (checked) {
      if (!currentCrossSells.includes(productId)) {
        form.setValue("crossSellProducts", [...currentCrossSells, productId]);
      }
    } else {
      form.setValue("crossSellProducts", currentCrossSells.filter(id => id !== productId));
    }
  };

  const upsellProducts = form.getValues("upsellProducts") || [];
  const crossSellProducts = form.getValues("crossSellProducts") || [];

  return (
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
                <Checkbox 
                  id={`upsell-${product.id}`} 
                  checked={upsellProducts.includes(product.id)}
                  onCheckedChange={(checked) => handleUpsellChange(checked, product.id)}
                />
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
                <Checkbox 
                  id={`cross-sell-${product.id}`} 
                  checked={crossSellProducts.includes(product.id)}
                  onCheckedChange={(checked) => handleCrossSellChange(checked, product.id)}
                />
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
  );
};

export default LinkedProductsTab;
