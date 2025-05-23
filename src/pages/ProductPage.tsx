
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  const { product, loading } = useProductData(productId);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    if (!product) return;
    
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
    // In a real app, this would dispatch to a cart context/store
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
            stock={product.stock}
          />
          
          <ProductPrice 
            price={product.price}
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
          
          <ProductVariations variations={product.variations} />
          
          <ProductQuantity 
            quantity={quantity} 
            stock={product.stock}
            setQuantity={setQuantity}
          />
          
          <ProductActions 
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            isOutOfStock={product.stock <= 0}
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
