
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, ImageIcon, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface DescriptionsTabProps {
  form: UseFormReturn<any>;
  imageUrls: string[];
  handleAddImage: () => void;
  handleChangeImage: (index: number, url: string) => void;
  handleRemoveImage: (index: number) => void;
}

const DescriptionsTab = ({
  form,
  imageUrls,
  handleAddImage,
  handleChangeImage,
  handleRemoveImage
}: DescriptionsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center">
            <FileText className="h-5 w-5 mr-2" /> 
            Product Descriptions
          </span>
        </CardTitle>
        <CardDescription>
          Add detailed descriptions and images for your product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Short Description */}
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief product description (displayed in product lists)" 
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Add Images to Short Description</p>
              <Button 
                type="button" 
                size="sm" 
                variant="outline"
                onClick={handleAddImage}
              >
                <ImageIcon className="h-4 w-4 mr-1" /> Add Image
              </Button>
            </div>
            
            <div className="space-y-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Image URL"
                    value={url}
                    onChange={(e) => handleChangeImage(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detailed product description (displayed on product page)" 
                  className="resize-none min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include all relevant details about the product, such as benefits, instructions, and other important information.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default DescriptionsTab;
