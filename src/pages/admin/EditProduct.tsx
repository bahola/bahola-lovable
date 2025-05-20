
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import ProductForm from '@/components/admin/ProductForm';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<any | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        
        // Fetch product with variations
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:category_id(*),
            subcategory:subcategory_id(*),
            product_variations(*)
          `)
          .eq('id', productId)
          .single();
        
        if (error) {
          throw error;
        }
        
        console.log('Fetched product data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Failed to load product",
          description: "Could not retrieve the product information.",
          variant: "destructive"
        });
        navigate('/admin/products');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId, navigate, toast]);
  
  const handleProductUpdated = () => {
    toast({
      title: "Product updated",
      description: "The product has been successfully updated."
    });
    navigate('/admin/products');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading product data...</span>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Product Not Found</h2>
        <p>The product you're trying to edit does not exist.</p>
        <Button onClick={() => navigate('/admin/products')}>Back to Products</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
          <p className="text-muted-foreground">Update product information</p>
        </div>
        
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          Cancel
        </Button>
      </div>
      
      {/* Only render ProductForm once product data is available */}
      {product && (
        <ProductForm 
          initialProduct={product} 
          onProductAdded={handleProductUpdated} 
          isEditing={true}
        />
      )}
    </div>
  );
};

export default EditProduct;
