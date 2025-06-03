
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';

// Import refactored components
import ProductImages, { ProductImagesLoading } from '@/components/product/ProductImages';
import ProductRating from '@/components/product/ProductRating';
import ProductPrice from '@/components/product/ProductPrice';
import ProductSpecs from '@/components/product/ProductSpecs';
import ProductVariations from '@/components/product/ProductVariations';
import ProductQuantity from '@/components/product/ProductQuantity';
import ProductActions from '@/components/product/ProductActions';
import ProductShipping from '@/components/product/ProductShipping';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import ProductNotFound from '@/components/product/ProductNotFound';
import { useProductData } from '@/components/product/useProductData';
import { Skeleton } from '@/components/ui/skeleton';
import ProductReviews from '@/components/product/ProductReviews';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Modified product data hook to handle both ID and name-based lookups
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        
        let query = supabase
          .from('products')
          .select(`
            *,
            product_categories(name),
            product_variations(*)
          `);
        
        // Check if productId is a UUID (for backward compatibility) or a slug
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
        
        if (isUUID) {
          query = query.eq('id', productId);
        } else {
          // Convert slug back to name for lookup
          const productName = productId.replace(/-/g, ' ');
          query = query.ilike('name', productName);
        }
        
        const { data, error } = await query.single();
          
        if (error) {
          throw error;
        }
        
        // Fetch review count
        const { count, error: reviewError } = await supabase
          .from('product_reviews')
          .select('id', { count: 'exact', head: true })
          .eq('product_id', data.id);
          
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
              .eq('product_id', data.id);
              
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
            variations: data.product_variations || [],
            tax_status: (data.tax_status === 'non-taxable' ? 'non-taxable' : 'taxable') as 'taxable' | 'non-taxable',
            tax_class: (data.tax_class === '0' || data.tax_class === '12' ? data.tax_class : '5') as '0' | '5' | '12'
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

  
  const handleAddToCart = () => {
    if (!product) {
      console.error('No product available to add to cart');
      return;
    }
    
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    
    try {
      // Calculate the price based on selected variation or base price
      const finalPrice = selectedVariation?.price || product.price;
      
      addToCart({
        id: String(product.id),
        name: product.name,
        price: finalPrice,
        originalPrice: product.originalPrice,
        discountPercentage: product.discountPercentage,
        image: product.image || '/placeholder.svg',
        taxStatus: product.tax_status || 'taxable',
        taxClass: product.tax_class || '5'
      }, quantity);
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  const handleVariationSelect = (variation: any) => {
    setSelectedVariation(variation);
  };

  // Calculate current stock based on selected variation or total stock
  const getCurrentStock = () => {
    if (selectedVariation) {
      return selectedVariation.stock || 0;
    }
    return product?.stock || 0;
  };

  
  // Loading state
  if (loading) {
    return (
      <PageLayout title="Loading Product..." description="Please wait while we load the product details">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImagesLoading />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // If product not found
  if (!product) {
    return <ProductNotFound />;
  }

  const currentStock = getCurrentStock();
  
  return (
    <PageLayout title={product.name} description={product.description}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <ProductImages 
          image={product.image} 
          images={product.images} 
          productName={product.name}
        />
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <ProductRating 
            rating={product.rating}
            reviewCount={product.reviewCount}
            stock={currentStock}
          />
          
          <ProductPrice 
            price={product.price}
            selectedPrice={selectedVariation?.price}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
          />
          
          {/* Short Description */}
          <div className="mb-6">
            <p className="text-bahola-neutral-700">{product.shortDescription}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-bahola-neutral-700">{product.description}</p>
          </div>
          
          {/* Only show ProductSpecs if there are variations (variable product) */}
          {product.variations && product.variations.length > 0 && (
            <ProductSpecs potency={product.potency} brand={product.brand} />
          )}
          
          <ProductVariations 
            variations={product.variations} 
            onVariationSelect={handleVariationSelect}
          />
          
          <ProductQuantity 
            quantity={quantity} 
            stock={currentStock}
            setQuantity={setQuantity}
          />
          
          <ProductActions 
            product={{
              id: String(product.id),
              name: product.name,
              price: selectedVariation?.price || product.price,
              originalPrice: product.originalPrice,
              discountPercentage: product.discountPercentage,
              image: product.image,
              stock: currentStock
            }}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            isOutOfStock={currentStock <= 0}
          />
          
          <ProductShipping shippingInfo={product.shipping} />
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <ProductTabs 
        benefits={product.benefits}
        usage={product.usage}
        ingredients={product.ingredients}
        reviewCount={product.reviewCount}
        productId={product.id}
      />
      
      {/* Related Products Section */}
      <RelatedProducts />
    </PageLayout>
  );
};

export default ProductPage;
