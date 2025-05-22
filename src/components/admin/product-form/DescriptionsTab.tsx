
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImagePlus, TrashIcon } from "lucide-react";
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detailed Description</CardTitle>
          <CardDescription>
            Complete product description with formatting, details, and benefits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed product description"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This description will appear on the product detail page. You can include detailed information, 
                  usage instructions, and benefits.
                </FormDescription>
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
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => handleChangeImage(index, e.target.value)}
                  placeholder="Image URL"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleRemoveImage(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddImage} 
              className="w-full"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionsTab;
