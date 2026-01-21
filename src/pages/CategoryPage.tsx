import React, { useEffect, useState, useMemo } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams, useLocation } from 'react-router-dom';
import { CategoryPageHeader } from '@/components/category/CategoryPageHeader';
import { CategoryFilters } from '@/components/category/CategoryFilters';
import { ProductGrid } from '@/components/category/ProductGrid';
import { formatName, getPageInfo } from '@/utils/productUtils';
import { useSwellProducts, getSwellProductImage, getSwellDiscountPercentage, SwellProduct } from '@/hooks/useSwellProducts';
import { getSwellCategorySlug, getSubcategoryLetter, getCategoryFilterConfig } from '@/config/swellCategoryMapping';

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
  potency?: string;
  packSize?: string;
}

const CategoryPage = () => {
  const { categoryId, concernId, subcategoryId } = useParams<{ 
    categoryId?: string; 
    concernId?: string;
    subcategoryId?: string;
  }>();
  
  const location = useLocation();
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState([0, 5000]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  // New filter states
  const [potencyFilter, setPotencyFilter] = useState<string[]>([]);
  const [packSizeFilter, setPackSizeFilter] = useState<string[]>([]);
  
  // Get filter configuration for this category
  const filterConfig = useMemo(() => {
    return getCategoryFilterConfig(categoryId || '');
  }, [categoryId]);
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Reset filters when category changes
  useEffect(() => {
    setPotencyFilter([]);
    setPackSizeFilter([]);
    setPriceRange([0, 5000]);
  }, [categoryId, subcategoryId]);
  
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

  // Helper function to extract potency and pack size from product
  const extractProductAttributes = (product: SwellProduct): { potency?: string; packSize?: string } => {
    let potency: string | undefined;
    let packSize: string | undefined;
    
    // Try to extract from options
    if (product.options) {
      const potencyOption = product.options.find(opt => 
        opt.name.toLowerCase().includes('potency')
      );
      const packSizeOption = product.options.find(opt => 
        opt.name.toLowerCase().includes('pack') || opt.name.toLowerCase().includes('size')
      );
      
      if (potencyOption?.values?.[0]?.name) {
        potency = potencyOption.values[0].name;
      }
      if (packSizeOption?.values?.[0]?.name) {
        packSize = packSizeOption.values[0].name;
      }
    }
    
    // Try to extract from variants
    if (product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      if (firstVariant.name) {
        // Parse variant name like "30C / 30ml"
        const parts = firstVariant.name.split(/[\/,\s]+/);
        parts.forEach(part => {
          const cleanPart = part.trim();
          if (/^\d+[CXM]$/i.test(cleanPart) || /^LM\d+$/i.test(cleanPart)) {
            potency = cleanPart.toUpperCase();
          } else if (/^\d+ml$/i.test(cleanPart) || /^\d+g$/i.test(cleanPart)) {
            packSize = cleanPart.toLowerCase();
          }
        });
      }
    }
    
    return { potency, packSize };
  };

  // Transform Swell products to our Product interface
  const products: Product[] = useMemo(() => {
    return swellProducts.map(product => {
      const { potency, packSize } = extractProductAttributes(product);
      return {
        id: product.id,
        title: product.name,
        description: product.description || 'No description available',
        price: product.sale_price || product.price,
        imageSrc: getSwellProductImage(product),
        discountPercentage: getSwellDiscountPercentage(product),
        rating: 4.5,
        reviewCount: 10,
        url: `/product/${product.slug || product.id}`,
        potency,
        packSize
      };
    });
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
    setPriceRange([0, 5000]);
    setSearchQuery('');
    setPotencyFilter([]);
    setPackSizeFilter([]);
  };
  
  // Apply all filters to products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Potency filter
      if (potencyFilter.length > 0 && product.potency) {
        if (!potencyFilter.includes(product.potency)) {
          return false;
        }
      }
      
      // Pack size filter
      if (packSizeFilter.length > 0 && product.packSize) {
        if (!packSizeFilter.includes(product.packSize)) {
          return false;
        }
      }
      
      return true;
    });
  }, [products, priceRange, potencyFilter, packSizeFilter]);

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
          potencyFilter={potencyFilter}
          setPotencyFilter={setPotencyFilter}
          packSizeFilter={packSizeFilter}
          setPackSizeFilter={setPackSizeFilter}
          filterConfig={filterConfig}
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
            <div className="text-center p-8 text-destructive">{error}</div>
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
