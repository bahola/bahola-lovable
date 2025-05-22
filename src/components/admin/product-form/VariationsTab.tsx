
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductVariation } from "@/types/product";

interface VariationsTabProps {
  productType: "simple" | "variable";
  potencyValues: string[];
  packSizeValues: string[];
  variations: ProductVariation[];
  handleUpdateVariation: (index: number, field: keyof ProductVariation, value: number) => void;
}

const VariationsTab = ({
  productType,
  potencyValues,
  packSizeValues,
  variations,
  handleUpdateVariation
}: VariationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Variations</CardTitle>
        <CardDescription>
          Manage prices, stock, and weights for different product variations.
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
        ) : potencyValues.length === 0 && packSizeValues.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              Please add at least one attribute (potency or pack size) in the Attributes tab 
              to generate variations.
            </p>
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted">
                <tr>
                  {potencyValues.length > 0 && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Potency
                    </th>
                  )}
                  {packSizeValues.length > 0 && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Pack Size
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Price (₹)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Weight (g)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {variations.map((variation, index) => (
                  <tr key={index}>
                    {potencyValues.length > 0 && (
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        {variation.potency}
                      </td>
                    )}
                    {packSizeValues.length > 0 && (
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {variation.packSize}
                      </td>
                    )}
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
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <Input 
                        type="number"
                        value={variation.weight}
                        onChange={(e) => handleUpdateVariation(
                          index, 
                          "weight", 
                          parseFloat(e.target.value) || 0
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
  );
};

export default VariationsTab;
