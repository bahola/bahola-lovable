
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams, useLocation } from 'react-router-dom';
import { CategoryPageHeader } from '@/components/category/CategoryPageHeader';
import { CategoryFilters } from '@/components/category/CategoryFilters';
import { ProductGrid } from '@/components/category/ProductGrid';
import { formatName, getPageInfo, generateMockProducts } from '@/utils/productUtils';

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
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  // Determine if we're viewing a category or concern page
  const isConcernPage = location.pathname.includes('/concern/');
  const id = isConcernPage ? concernId : categoryId;
  
  // Get page info based on if we're viewing a category, subcategory, or concern
  const pageInfo = getPageInfo(id, isConcernPage, subcategoryId);
  
  // Generate products based on current category/subcategory
  const products = generateMockProducts(subcategoryId);
  
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
  
  // Apply search filter
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            productCount={pageInfo.productCount}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          <ProductGrid 
            products={filteredProducts}
            viewMode={viewMode}
            clearFilters={clearFilters}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
