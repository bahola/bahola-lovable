
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Image } from 'lucide-react';

interface DescriptionsTabProps {
  form: any;
  imageUrls: string[];
  handleAddImage: () => void;
  handleChangeImage: (index: number, url: string) => void;
  handleRemoveImage: (index: number) => void;
}

const DescriptionsTab = ({ form, imageUrls, handleAddImage, handleChangeImage, handleRemoveImage }: DescriptionsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Descriptions</CardTitle>
          <CardDescription>
            Add detailed product descriptions, benefits, usage instructions, and ingredients.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter a detailed product description..." 
                    className="min-h-[150px] resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Benefits Array Field */}
          <div className="space-y-2">
            <FormLabel>Product Benefits</FormLabel>
            <div className="space-y-2">
              {form.watch('benefits')?.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => {
                      const newBenefits = [...form.getValues('benefits')];
                      newBenefits[index] = e.target.value;
                      form.setValue('benefits', newBenefits);
                    }}
                    placeholder={`Benefit ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newBenefits = [...form.getValues('benefits')].filter((_, i) => i !== index);
                      form.setValue('benefits', newBenefits);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const currentBenefits = form.getValues('benefits') || [];
                  form.setValue('benefits', [...currentBenefits, '']);
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Benefit
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="usage_instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Instructions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter usage instructions..." 
                    className="resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter product ingredients..." 
                    className="resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Add images to showcase your product. The first image will be used as the main product image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {url ? (
                    <img 
                      src={url} 
                      alt={`Product ${index}`} 
                      className="w-full h-full object-cover" 
                      onError={() => console.log(`Failed to load preview for image URL: ${url}`)}
                    />
                  ) : (
                    <Image className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <Input
                  value={url}
                  onChange={(e) => {
                    console.log(`Changing image URL at index ${index} to: ${e.target.value}`);
                    handleChangeImage(index, e.target.value);
                  }}
                  placeholder="Image URL"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                console.log('Adding new image URL');
                handleAddImage();
              }}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionsTab;
