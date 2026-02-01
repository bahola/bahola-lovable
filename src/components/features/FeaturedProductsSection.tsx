import React from 'react';
import { Button } from "@/components/ui/button";
import { ProductCard } from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwellProducts, getSwellProductImage, getSwellEffectivePrice, hasMultipleVariants } from '@/hooks/useSwellProducts';

export const FeaturedProductsSection = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useSwellProducts({ limit: 6 });
  
  const handleViewAllProducts = () => {
    navigate('/category/all-products');
  };

  // Transform Swell products to ProductCard format
  const transformedProducts = products.map(product => {
    // Use effective price which handles variant-based pricing
    const effectivePrice = getSwellEffectivePrice(product);
    const productHasVariants = hasMultipleVariants(product);
    
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: effectivePrice,
      rating: 4.7, // Swell doesn't have ratings by default
      image: getSwellProductImage(product),
      originalPrice: product.sale_price && product.price ? product.price : undefined,
      discountPercentage: product.sale_price && product.price 
        ? Math.round(((product.price - product.sale_price) / product.price) * 100) 
        : undefined,
      hasVariants: productHasVariants,
    };
  });
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-bahola-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-500 mb-4">{error}</p>
          </div>
        ) : transformedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 mb-4">No products available.</p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button 
            className="btn-bahola"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
