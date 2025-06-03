
import React, { useEffect, useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { CategoryFilters } from '@/components/category/CategoryFilters';
import { ProductGrid } from '@/components/category/ProductGrid';
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

const AllergiesProductsPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([100, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch allergies products from database
  useEffect(() => {
    const fetchAllergiesProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching allergies products...');
        
        // Find the allergies subcategory
        const { data: subcategoryData } = await supabase
          .from('product_subcategories')
          .select('id, category_id')
          .ilike('name', '%allergies%')
          .single();
        
        if (subcategoryData) {
          console.log('Found allergies subcategory:', subcategoryData);
          
          // Fetch products for this subcategory
          const { data, error } = await supabase
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
            `)
            .eq('subcategory_id', subcategoryData.id);
          
          if (error) {
            console.error('Error fetching allergies products:', error);
            setProducts([]);
          } else {
            console.log('Fetched allergies products:', data);
            
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
              url: `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`
            }));
            
            setProducts(transformedProducts);
          }
        } else {
          console.log('No allergies subcategory found');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error in fetchAllergiesProducts:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllergiesProducts();
  }, []);

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
      title="Allergies Products" 
      description="Homeopathic remedies for allergies and hay fever"
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
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {filteredProducts.length} allergies products found
                </span>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center p-8">Loading allergies products...</div>
          ) : (
            <ProductGrid 
              products={filteredProducts}
              viewMode="grid"
              clearFilters={clearFilters}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AllergiesProductsPage;
