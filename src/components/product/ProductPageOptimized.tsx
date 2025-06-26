
import React from 'react';
import { SEO } from '@/components/SEO';
import ProductImages from '@/components/product/ProductImages';
import ProductPrice from '@/components/product/ProductPrice';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';

interface ProductPageOptimizedProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    image: string;
    category: string;
    inStock: boolean;
    benefits: string[];
    usage: string;
    ingredients: string;
    reviews: any[];
    stock?: number;
  };
  relatedProducts: any[];
}

// Server-compatible product page component
const ProductPageOptimized: React.FC<ProductPageOptimizedProps> = ({
  product,
  relatedProducts
}) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": product.inStock ? "InStock" : "OutOfStock"
    },
    "aggregateRating": product.reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length,
      "reviewCount": product.reviews.length
    } : undefined
  };

  return (
    <>
      <SEO
        title={`${product.name} - Homeopathic Medicine | Bahola Labs`}
        description={product.description}
        keywords={[product.name, product.category, 'homeopathic medicine', 'natural remedy']}
        url={`/products/${product.id}`}
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ProductImages 
              image={product.image} 
              images={product.images} 
              productName={product.name} 
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-bahola-navy-950 mb-2">
                {product.name}
              </h1>
              <p className="text-bahola-neutral-600 text-lg">
                {product.category}
              </p>
            </div>
            
            <ProductPrice 
              price={product.price}
            />
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-bahola-neutral-700">
                {product.description}
              </p>
            </div>
            
            <ProductActions 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock
              }}
              quantity={1}
              setQuantity={() => {}}
              isOutOfStock={!product.inStock}
            />
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <ProductTabs 
          benefits={product.benefits || []}
          usage={product.usage || ''}
          ingredients={product.ingredients || ''}
          reviewCount={product.reviews.length}
          productId={product.id}
        />
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </>
  );
};

export default ProductPageOptimized;
