
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductData {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
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
        
        // Fetch product data
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
        
        // Fetch review count
        const { count, error: reviewError } = await supabase
          .from('product_reviews')
          .select('id', { count: 'exact', head: true })
          .eq('product_id', productId);
          
        if (reviewError) {
          console.error('Error fetching review count:', reviewError);
        }
        
        if (data) {
          // Calculate average rating if there are reviews
          let avgRating = 4.8; // Default value
          
          if (count && count > 0) {
            const { data: reviewData, error: ratingError } = await supabase
              .from('product_reviews')
              .select('rating')
              .eq('product_id', productId);
              
            if (!ratingError && reviewData && reviewData.length > 0) {
              const sum = reviewData.reduce((acc, review) => acc + review.rating, 0);
              avgRating = parseFloat((sum / reviewData.length).toFixed(1));
            }
          }
          
          // Handle the main image - use the image from database if available
          const mainImage = data.image || '';
          console.log('Product image from database:', mainImage);
          
          // Create array of images - only include valid image URLs
          const imageArray = mainImage && mainImage.trim() !== '' && mainImage.startsWith('http') ? [mainImage] : [];
          console.log('Image array created:', imageArray);
          
          // Calculate stock based on product type
          let totalStock = 0;
          if (data.type === 'variable' && data.product_variations && data.product_variations.length > 0) {
            // For variable products, sum up stock from all variations
            totalStock = data.product_variations.reduce((sum: number, variation: any) => sum + (variation.stock || 0), 0);
            console.log('Variable product total stock:', totalStock, 'from variations:', data.product_variations);
          } else {
            // For simple products, use the product's stock
            totalStock = data.stock || 0;
            console.log('Simple product stock:', totalStock);
          }
          
          // Transform the data into the shape we need for the UI
          setProduct({
            id: data.id,
            name: data.name,
            description: data.description || '',
            shortDescription: data.short_description || '',
            price: data.price,
            originalPrice: data.price * 1.15, // Example: calculate original price before discount
            discountPercentage: 14, // Example: hardcoded discount
            image: mainImage,
            images: imageArray,
            rating: avgRating,
            reviewCount: count || 0,
            stock: totalStock,
            potency: data.product_variations?.[0]?.potency || '30C',
            brand: 'Bahola Labs', // Example: hardcoded brand
            benefits: data.benefits || [
              'Relieves pain and swelling from injuries',
              'Helps heal bruises and muscle soreness',
              'Useful for post-surgical recovery',
              'Reduces shock after trauma or accidents'
            ],
            usage: data.usage_instructions || 'Take 3-5 pellets under the tongue 3 times daily or as directed by your homeopathic practitioner.',
            ingredients: data.ingredients || `${data.name} ${data.product_variations?.[0]?.potency || ''}, Sucrose (inactive)`,
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
