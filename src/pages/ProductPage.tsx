import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { PageLayout } from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartAdapter';
import { useSwellProduct, getSwellProductImage, getSwellProductImages, getSwellDiscountPercentage, getSwellEffectivePrice } from '@/hooks/useSwellProducts';

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
import { Shield, Truck, RotateCcw, Award } from 'lucide-react';

const ProductPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Fetch product from Swell
  const { product: swellProduct, loading, error } = useSwellProduct(productSlug);

  // Helper to safely get variants array from Swell response
  const getVariantsArray = (variants: any): any[] => {
    if (!variants) return [];
    if (Array.isArray(variants)) return variants;
    if (variants.results && Array.isArray(variants.results)) return variants.results;
    return [];
  };

  // Transform Swell product to our format
  const product = swellProduct ? {
    id: swellProduct.id,
    name: swellProduct.name,
    description: swellProduct.description || '',
    shortDescription: swellProduct.description?.substring(0, 150) || '',
    price: getSwellEffectivePrice(swellProduct),
    originalPrice: swellProduct.sale_price ? swellProduct.price : swellProduct.price * 1.15,
    discountPercentage: getSwellDiscountPercentage(swellProduct) || 14,
    image: getSwellProductImage(swellProduct),
    images: getSwellProductImages(swellProduct),
    rating: 4.8, // Default - Swell doesn't have ratings
    reviewCount: 0,
    stock: swellProduct.stock_level ?? 100,
    potency: swellProduct.options?.[0]?.values?.[0]?.name || '30C',
    brand: 'Bahola Labs',
    benefits: swellProduct.content?.benefits || [
      'Relieves pain and swelling from injuries',
      'Helps heal bruises and muscle soreness',
      'Useful for post-surgical recovery',
      'Reduces shock after trauma or accidents'
    ],
    usage: swellProduct.content?.usage || 'Take 3-5 pellets under the tongue 3 times daily or as directed by your homeopathic practitioner.',
    ingredients: swellProduct.content?.ingredients || `${swellProduct.name}, Sucrose (inactive)`,
    precautions: 'Consult a qualified homeopathic practitioner before use. Not a replacement for emergency medical care for serious injuries.',
    shipping: 'Usually ships within 24 hours. Free shipping on orders above ₹500.',
    category: Array.isArray(swellProduct.categories) 
      ? swellProduct.categories[0]?.name 
      : (swellProduct.categories as any)?.results?.[0]?.name || 'Uncategorized',
    variations: getVariantsArray(swellProduct.variants).map((v: any) => {
      // Parse variant name like "CM, 30ml" into potency and pack_size
      const parts = v.name?.split(',').map((s: string) => s.trim()) || [];
      return {
        id: v.id,
        potency: parts[0] || v.name,
        pack_size: parts[1] || '',
        price: v.price,
        stock: v.stock_level ?? 100
      };
    }),
    tax_status: 'taxable' as const,
    tax_class: '5' as const,
    slug: swellProduct.slug
  } : null;
  
  const handleAddToCart = () => {
    if (!product) {
      console.error('No product available to add to cart');
      return;
    }
    
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    
    try {
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
  
  // Error or not found
  if (error || !product) {
    return <ProductNotFound />;
  }

  const currentStock = getCurrentStock();
  
  return (
    <PageLayout title={product.name} description={product.description}>
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
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <ProductImages 
                image={product.image} 
                images={product.images} 
                productName={product.name}
              />
            </div>
            
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
                
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-bahola-blue-500">
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.shortDescription || '') }}
                  />
                </div>
              </div>

              {/* Product Options Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <h2 className="font-semibold mb-4 text-lg text-gray-900">Product Details</h2>
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description || '') }}
                  />
                </div>
                
                
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
                
                <div className="grid grid-cols-2 gap-4 mt-6">
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
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16 hover:shadow-xl transition-all duration-300">
            <ProductTabs 
              benefits={product.benefits}
              usage={product.usage}
              ingredients={product.ingredients}
              reviewCount={product.reviewCount}
              productId={product.id}
            />
          </div>
          
          {/* Related Products Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-8">
            <RelatedProducts />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;
