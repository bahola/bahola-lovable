
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  url: string;
}

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  clearFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  viewMode,
  clearFilters
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
        <Button onClick={clearFilters}>Clear All Filters</Button>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          imageSrc={product.imageSrc}
          discountPercentage={product.discountPercentage}
          rating={product.rating}
          reviewCount={product.reviewCount}
          url={product.url}
        />
      ))}
    </div>
  );
};
