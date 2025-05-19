
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  potency: string;
  brand: string;
  benefits: string[];
  usage: string;
  ingredients: string;
  precautions: string;
  shipping: string;
  category: string;
  variations: any[];
}

export const useProductData = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            product_categories(name),
            product_variations(*)
          `)
          .eq('id', productId)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform the data into the shape we need for the UI
          setProduct({
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            originalPrice: data.price * 1.15, // Example: calculate original price before discount
            discountPercentage: 14, // Example: hardcoded discount
            image: data.image || '/placeholder.svg',
            images: [data.image || '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
            rating: 4.8, // Example: hardcoded rating
            reviewCount: 142, // Example: hardcoded review count
            stock: data.stock || 0,
            potency: data.product_variations?.[0]?.potency || '30C',
            brand: 'Bahola Labs', // Example: hardcoded brand
            benefits: [
              'Relieves pain and swelling from injuries',
              'Helps heal bruises and muscle soreness',
              'Useful for post-surgical recovery',
              'Reduces shock after trauma or accidents'
            ],
            usage: 'Take 3-5 pellets under the tongue 3 times daily or as directed by your homeopathic practitioner.',
            ingredients: `${data.name} ${data.product_variations?.[0]?.potency || ''}, Sucrose (inactive)`,
            precautions: 'Consult a qualified homeopathic practitioner before use. Not a replacement for emergency medical care for serious injuries.',
            shipping: 'Usually ships within 24 hours. Free shipping on orders above ₹500.',
            category: data.product_categories?.name || 'Uncategorized',
            variations: data.product_variations || []
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Failed to load product",
          description: "There was an error loading the product information.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId, toast]);

  return { product, loading };
};
