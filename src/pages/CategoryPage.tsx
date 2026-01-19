import React, { useEffect, useState, useMemo } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams, useLocation } from 'react-router-dom';
import { CategoryPageHeader } from '@/components/category/CategoryPageHeader';
import { CategoryFilters } from '@/components/category/CategoryFilters';
import { ProductGrid } from '@/components/category/ProductGrid';
import { formatName, getPageInfo } from '@/utils/productUtils';
import { useSwellProducts, getSwellProductImage, getSwellDiscountPercentage } from '@/hooks/useSwellProducts';
import { getSwellCategorySlug, getSubcategoryLetter } from '@/config/swellCategoryMapping';
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

const CategoryPage = () => {
  const { categoryId, concernId, subcategoryId } = useParams<{ 
    categoryId?: string; 
    concernId?: string;
    subcategoryId?: string;
  }>();
  
  const location = useLocation();
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState([100, 5000]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Determine if we're viewing a category or concern page
  const isConcernPage = location.pathname.includes('/concern/');
  const id = isConcernPage ? concernId : categoryId;

  // Build Swell query options
  const swellOptions = useMemo(() => {
    const options: { category?: string; subcategory?: string; search?: string; limit?: number } = {
      limit: 100 // Increase limit to account for subcategory filtering
    };
    
    // Map website category slug to Swell category slug
    if (categoryId && categoryId !== 'all-products') {
      options.category = getSwellCategorySlug(categoryId);
    }
    
    // Extract letter from subcategory for filtering (e.g., 'dil-a' -> 'a')
    if (subcategoryId) {
      options.subcategory = getSubcategoryLetter(subcategoryId);
    }
    
    if (debouncedSearchQuery) {
      options.search = debouncedSearchQuery;
    }
    
    return options;
  }, [categoryId, subcategoryId, debouncedSearchQuery]);

  // Fetch products from Swell
  const { products: swellProducts, loading: isLoading, error } = useSwellProducts(swellOptions);

  // Transform Swell products to our Product interface
  const products: Product[] = useMemo(() => {
    return swellProducts.map(product => ({
      id: product.id,
      title: product.name,
      description: product.description || 'No description available',
      price: product.sale_price || product.price,
      imageSrc: getSwellProductImage(product),
      discountPercentage: getSwellDiscountPercentage(product),
      rating: 4.5, // Default rating - Swell doesn't have ratings by default
      reviewCount: 10, // Default review count
      url: `/product/${product.slug || product.id}`
    }));
  }, [swellProducts]);
  
  // Get page info based on if we're viewing a category, subcategory, or concern
  const pageInfo = getPageInfo(id, isConcernPage, subcategoryId);
  
  // Filter toggle function
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setPriceRange([100, 5000]);
    setSearchQuery('');
  };
  
  // Apply local search filter (for additional client-side filtering)
  const filteredProducts = products.filter(product => {
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  return (
    <PageLayout 
      title={pageInfo.name} 
      description={pageInfo.description}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <CategoryFilters 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <div className="flex-1">
          <CategoryPageHeader 
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            isConcernPage={isConcernPage}
            formattedName={formatName(id)}
            productCount={filteredProducts.length}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          {isLoading ? (
            <div className="text-center p-8">Loading products...</div>
          ) : error ? (
            <div className="text-center p-8 text-red-500">{error}</div>
          ) : (
            <ProductGrid 
              products={filteredProducts}
              viewMode={viewMode}
              clearFilters={clearFilters}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
