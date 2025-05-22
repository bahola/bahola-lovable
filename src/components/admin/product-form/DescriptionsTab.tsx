
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { FileText, Image as ImageIcon, Upload, X } from 'lucide-react';

interface DescriptionsTabProps {
  form: UseFormReturn<any>;
  imageUrls: string[];
  onAddImage: (url: string) => void;
  onChangeImage: (index: number, url: string) => void;
  onRemoveImage: (index: number) => void;
}

const DescriptionsTab = ({ 
  form, 
  imageUrls, 
  onAddImage, 
  onChangeImage, 
  onRemoveImage 
}: DescriptionsTabProps) => {
  const [newImageUrl, setNewImageUrl] = React.useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onAddImage(newImageUrl.trim());
      setNewImageUrl('');
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Description</CardTitle>
          <CardDescription>
            Detailed information about the product that will be displayed on the product page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" /> 
                    Full Description
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter detailed product description" 
                    rows={8}
                    {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription>
                  Provide a comprehensive description of the product, including benefits, features, and usage instructions.
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
            Add product images that will be displayed on the product page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Images */}
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={`image-${index}`} className="relative border rounded p-2">
                    <div className="aspect-square w-full overflow-hidden rounded bg-gray-100">
                      {url ? (
                        <img 
                          src={url} 
                          alt={`Product Image ${index + 1}`} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <Input 
                        value={url}
                        onChange={(e) => onChangeImage(index, e.target.value)}
                        className="flex-1 text-xs" 
                        placeholder="Image URL"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => onRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add New Image */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add New Image</h3>
            <div className="flex gap-2">
              <Input 
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL" 
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddImage}
              >
                <Upload className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Paste a URL for your product image. Images should be at least 800x800 pixels.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionsTab;
