
import React, { memo } from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the useProductForm hook
import { useProductForm } from "@/hooks/useProductForm";

// Import the refactored tab components
import GeneralTab from './product-form/GeneralTab';
import ShippingTab from './product-form/ShippingTab';
import LinkedProductsTab from './product-form/LinkedProductsTab';
import AttributesTab from './product-form/AttributesTab';
import VariationsTab from './product-form/VariationsTab';
import DescriptionsTab from './product-form/DescriptionsTab';

interface ProductFormProps {
  onProductAdded?: (product?: any) => void;
  initialProduct?: any;
  isEditing?: boolean;
}

// Use memo to prevent unnecessary re-renders
const ProductForm = memo(({ onProductAdded, initialProduct, isEditing = false }: ProductFormProps) => {
  const {
    form,
    activeTab,
    setActiveTab,
    isSubmitting,
    productType,
    potencyValues,
    packSizeValues,
    variations,
    imageUrls,
    onSubmit,
    handleAddPotency,
    handleAddPackSize,
    handleRemovePotency,
    handleRemovePackSize,
    handleUpdateVariation,
    handleAddImage,
    handleChangeImage,
    handleRemoveImage,
  } = useProductForm(onProductAdded, initialProduct, isEditing);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="linked">Linked Products</TabsTrigger>
            <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <GeneralTab form={form} />
          </TabsContent>

          {/* Attributes Tab */}
          <TabsContent value="attributes">
            <AttributesTab 
              productType={productType}
              potencyValues={potencyValues}
              packSizeValues={packSizeValues}
              onAddPotency={handleAddPotency}
              onAddPackSize={handleAddPackSize}
              onRemovePotency={handleRemovePotency}
              onRemovePackSize={handleRemovePackSize}
            />
          </TabsContent>
          
          {/* Variations Tab */}
          <TabsContent value="variations">
            <VariationsTab 
              productType={productType}
              potencyValues={potencyValues}
              packSizeValues={packSizeValues}
              variations={variations}
              handleUpdateVariation={handleUpdateVariation}
            />
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping">
            <ShippingTab form={form} />
          </TabsContent>

          {/* Linked Products Tab */}
          <TabsContent value="linked">
            <LinkedProductsTab form={form} />
          </TabsContent>

          {/* Descriptions Tab */}
          <TabsContent value="descriptions">
            <DescriptionsTab 
              form={form}
              imageUrls={imageUrls}
              onAddImage={handleAddImage}
              onChangeImage={handleChangeImage}
              onRemoveImage={handleRemoveImage}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
});

ProductForm.displayName = 'ProductForm';

export default ProductForm;
