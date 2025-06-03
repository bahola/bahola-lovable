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
import { Skeleton } from '@/components/ui/skeleton';
import ProductReviews from '@/components/product/ProductReviews';
import { Shield, Truck, RotateCcw, Award } from 'lucide-react';

const ProductPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productSlug) return;
      
      try {
        setLoading(true);
        console.log('Fetching product with slug/ID:', productSlug);
        
        let query = supabase
          .from('products')
          .select(`
            *,
            product_categories(name),
            product_variations(*)
          `);
        
        // Check if productSlug is a UUID (for direct ID lookups) or a slug
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productSlug);
        
        if (isUUID) {
          console.log('Looking up product by UUID:', productSlug);
          query = query.eq('id', productSlug);
        } else {
          // Convert slug back to name for lookup
          const productName = productSlug.replace(/-/g, ' ');
          console.log('Looking up product by name:', productName);
          query = query.ilike('name', productName);
        }
        
        const { data, error } = await query.single();
          
        if (error) {
          console.error('Product not found:', error);
          throw error;
        }
        
        console.log('Product found:', data);
        
        // Fetch review count from Supabase
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
          
          // Handle images
          const mainImage = data.image || '';
          console.log('Product image:', mainImage);
          
          // Validate image URLs
          const isValidImageUrl = (url: string) => {
            return url && 
                   url.trim() !== '' && 
                   url !== '/placeholder.svg' && 
                   url !== 'null' && 
                   url !== 'undefined' &&
                   (url.startsWith('http') || url.startsWith('https://vjkhsdwavbswcoyfgyvg.supabase.co/storage'));
          };
          
          // Create array of images
          const imageArray = isValidImageUrl(mainImage) ? [mainImage] : [];
          console.log('Image array created:', imageArray);
          
          // Calculate stock based on product type
          let totalStock = 0;
          if (data.type === 'variable' && data.product_variations && data.product_variations.length > 0) {
            totalStock = data.product_variations.reduce((sum: number, variation: any) => sum + (variation.stock || 0), 0);
            console.log('Variable product total stock:', totalStock);
          } else {
            totalStock = data.stock || 0;
            console.log('Simple product stock:', totalStock);
          }
          
          // Transform the data
          setProduct({
            id: data.id,
            name: data.name,
            description: data.description || '',
            shortDescription: data.short_description || '',
            price: data.price,
            originalPrice: data.price * 1.15,
            discountPercentage: 14,
            image: mainImage,
            images: imageArray,
            rating: avgRating,
            reviewCount: count || 0,
            stock: totalStock,
            potency: data.product_variations?.[0]?.potency || '30C',
            brand: 'Bahola Labs',
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
  }, [productSlug, toast]);

  
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

  
  // Loading state with enhanced skeleton
  if (loading) {
    return (
      <PageLayout title="Loading Product..." description="Please wait while we load the product details">
        <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductImagesLoading />
              <div className="space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
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
      {/* Enhanced gradient background */}
      <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-gray-600 mb-8 flex items-center space-x-2">
            <span className="hover:text-bahola-blue-600 cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="hover:text-bahola-blue-600 cursor-pointer transition-colors">Products</span>
            <span>/</span>
            <span className="hover:text-bahola-blue-600 cursor-pointer transition-colors">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Enhanced Product Images with hover effects */}
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <ProductImages 
                image={product.image} 
                images={product.images} 
                productName={product.name}
              />
            </div>
            
            {/* Enhanced Product Details with modern cards */}
            <div className="space-y-8">
              {/* Product Header Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">{product.name}</h1>
                
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

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    <Shield className="h-4 w-4" />
                    <span>100% Authentic</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    <Truck className="h-4 w-4" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
                    <RotateCcw className="h-4 w-4" />
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                    <Award className="h-4 w-4" />
                    <span>Premium Quality</span>
                  </div>
                </div>
                
                {/* Short Description */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-bahola-blue-500">
                  <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>
                </div>
              </div>

              {/* Product Options Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <h2 className="font-semibold mb-4 text-lg text-gray-900">Product Details</h2>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
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
              </div>

              {/* Shipping Info Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                <ProductShipping shippingInfo={product.shipping} />
              </div>
            </div>
          </div>
          
          {/* Enhanced Product Details Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16 hover:shadow-xl transition-all duration-300">
            <ProductTabs 
              benefits={product.benefits}
              usage={product.usage}
              ingredients={product.ingredients}
              reviewCount={product.reviewCount}
              productId={product.id}
            />
          </div>
          
          {/* Enhanced Related Products Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-8">
            <RelatedProducts />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;
