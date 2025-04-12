
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { List, Plus, X } from 'lucide-react';
import { ProductVariation } from "@/types/product";

interface AttributesTabProps {
  productType: "simple" | "variable";
  potencyValues: string[];
  packSizeValues: string[];
  newPotency: string;
  newPackSize: string;
  setNewPotency: (value: string) => void;
  setNewPackSize: (value: string) => void;
  handleAddPotency: () => void;
  handleAddPackSize: () => void;
  handleRemovePotency: (value: string) => void;
  handleRemovePackSize: (value: string) => void;
}

const AttributesTab = ({
  productType,
  potencyValues,
  packSizeValues,
  newPotency,
  newPackSize,
  setNewPotency,
  setNewPackSize,
  handleAddPotency,
  handleAddPackSize,
  handleRemovePotency,
  handleRemovePackSize
}: AttributesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center">
            <List className="h-5 w-5 mr-2" /> 
            Product Attributes
          </span>
        </CardTitle>
        <CardDescription>
          Define attributes like potency and pack size to create product variations.
          You can add either one or both attributes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable Attributes Switch */}
        <div className="flex items-center space-x-2">
          <Switch 
            checked={productType === "variable"} 
            disabled 
            id="attributes-mode"
          />
          <label
            htmlFor="attributes-mode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {productType === "variable" 
              ? "Attributes enabled (Variable product)" 
              : "Attributes disabled (Simple product)"}
          </label>
        </div>

        <div className={productType !== "variable" ? "opacity-50 pointer-events-none" : ""}>
          {/* Potency Attribute */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Potency</h3>
            <div className="flex items-end gap-2 mb-2">
              <div className="flex-1">
                <Input 
                  value={newPotency} 
                  onChange={(e) => setNewPotency(e.target.value)}
                  placeholder="Ex: 30C, 200C, 1M"
                />
              </div>
              <Button 
                type="button" 
                onClick={handleAddPotency}
                disabled={!newPotency}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {potencyValues.map((potency, index) => (
                <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-md">
                  <span className="mr-2">{potency}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0"
                    onClick={() => handleRemovePotency(potency)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Pack Size Attribute */}
          <div>
            <h3 className="text-md font-medium mb-2">Pack Size</h3>
            <div className="flex items-end gap-2 mb-2">
              <div className="flex-1">
                <Input 
                  value={newPackSize} 
                  onChange={(e) => setNewPackSize(e.target.value)}
                  placeholder="Ex: 10g, 30ml, 100 pills"
                />
              </div>
              <Button 
                type="button" 
                onClick={handleAddPackSize}
                disabled={!newPackSize}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {packSizeValues.map((packSize, index) => (
                <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-md">
                  <span className="mr-2">{packSize}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0"
                    onClick={() => handleRemovePackSize(packSize)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttributesTab;
