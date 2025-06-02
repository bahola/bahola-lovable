
import React, { useEffect, useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useParams, useLocation } from 'react-router-dom';
import { CategoryPageHeader } from '@/components/category/CategoryPageHeader';
import { CategoryFilters } from '@/components/category/CategoryFilters';
import { ProductGrid } from '@/components/category/ProductGrid';
import { formatName, getPageInfo } from '@/utils/productUtils';
import { supabase } from '@/integrations/supabase/client';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching products for category/subcategory/concern:', { 
          categoryId, 
          subcategoryId, 
          concernId, 
          isConcernPage 
        });
        
        let query = supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            short_description,
            price,
            image,
            category:category_id(id, name, slug),
            subcategory:subcategory_id(id, name)
          `);

        // If we're on a concern page, we should filter by the concern (which is the subcategory)
        if (isConcernPage && concernId) {
          // First, get the "Specialty Products" category ID
          const { data: categoryData } = await supabase
            .from('product_categories')
            .select('id')
            .ilike('name', '%specialty%')
            .single();
          
          if (categoryData) {
            // Then find subcategory matching the concern name/slug
            const { data: subcategoryData } = await supabase
              .from('product_subcategories')
              .select('id')
              .or(`name.ilike.%${concernId}%, slug.ilike.%${concernId}%`)
              .eq('category_id', categoryData.id)
              .single();
            
            if (subcategoryData) {
              console.log('Found matching subcategory for concern:', subcategoryData);
              query = query
                .eq('category_id', categoryData.id)
                .eq('subcategory_id', subcategoryData.id);
            } else {
              console.log('No matching subcategory found for concern:', concernId);
            }
          }
        }
        // If we have a specific category, filter by it
        else if (categoryId) {
          // First, get the category UUID by slug
          const { data: categoryData } = await supabase
            .from('product_categories')
            .select('id, slug')
            .eq('slug', categoryId)
            .single();
          
          if (categoryData) {
            query = query.eq('category_id', categoryData.id);
            
            // If we also have a subcategory, filter by it
            if (subcategoryId) {
              // For alphabetical subcategories (like 'a', 'b', etc), filter by first letter of product name
              if (subcategoryId.length === 1 && /[a-z]/.test(subcategoryId)) {
                query = query.ilike('name', `${subcategoryId.toUpperCase()}%`);
              } else {
                // For other subcategories, try to match by subcategory name or slug
                const { data: subcategoryData } = await supabase
                  .from('product_subcategories')
                  .select('id, name')
                  .or(`name.ilike.%${subcategoryId}%,slug.ilike.%${subcategoryId}%`)
                  .eq('category_id', categoryData.id)
                  .single();
                
                if (subcategoryData) {
                  query = query.eq('subcategory_id', subcategoryData.id);
                }
              }
            }
          }
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        } else {
          console.log('Fetched products:', data);
          
          // Transform products to match the expected interface
          const transformedProducts: Product[] = data.map(product => ({
            id: product.id,
            title: product.name,
            description: product.short_description || product.description || 'No description available',
            price: product.price,
            imageSrc: product.image || '/placeholder.svg',
            discountPercentage: 0,
            rating: 4.5,
            reviewCount: 10,
            url: `/product/${product.id}`
          }));
          
          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error in fetchProducts:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId, concernId, isConcernPage]);
  
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
  
  // Apply search filter
  const filteredProducts = products.filter(product => 
    !debouncedSearchQuery || 
    product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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
            productCount={filteredProducts.length}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          {isLoading ? (
            <div className="text-center p-8">Loading products...</div>
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
