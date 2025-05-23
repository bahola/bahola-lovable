
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Define types for our search results
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
  category?: string;     // Added category
  subcategory?: string;  // Added subcategory
}

interface SearchFilters {
  categories: string[];
  priceRange: [number, number];
  rating: number;
}

export const useSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get('q') || '';
  
  const [searchValue, setSearchValue] = useState(queryParam);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(queryParam);
  const [sortOption, setSortOption] = useState('relevance');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    priceRange: [0, 5000],
    rating: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Fetch products from Supabase
  const fetchProducts = useCallback(async (searchTerm: string) => {
    setIsLoading(true);

    try {
      let query = supabase
        .from('products')
        .select(`
          id, 
          name,
          description,
          price,
          image,
          category:category_id(id, name),
          subcategory:subcategory_id(id, name)
        `);

      // Apply search filter if we have a search term
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching products:', error);
        setSearchResults([]);
      } else {
        console.log('Fetched products:', data);
        
        // Transform the data to match our Product interface
        const transformedProducts: Product[] = data.map(product => ({
          id: product.id,
          title: product.name,
          description: product.description || 'No description available',
          price: product.price,
          imageSrc: product.image || '/placeholder.svg',
          discountPercentage: 0, // Default value
          rating: 4.5, // Default value
          reviewCount: 10, // Default value
          url: `/product/${product.id}`,
          category: product.category?.name || '',
          subcategory: product.subcategory?.name || ''
        }));
        
        setSearchResults(transformedProducts);
      }
    } catch (error) {
      console.error('Error in fetch products:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchValue]);
  
  // Update URL when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue.trim() !== queryParam) {
      if (debouncedSearchValue.trim()) {
        navigate(`/search?q=${encodeURIComponent(debouncedSearchValue.trim())}`, { replace: true });
      }
    }
  }, [debouncedSearchValue, navigate, queryParam]);
  
  // Fetch products when debounced search value changes
  useEffect(() => {
    fetchProducts(debouncedSearchValue);
  }, [debouncedSearchValue, fetchProducts]);

  // Apply filters and sorting
  useEffect(() => {
    // Apply additional filters and sorting here if needed
    // This would modify the searchResults further based on filters and sort options
    // We can now filter by category and subcategory too
    if (filters.categories.length > 0) {
      setSearchResults(prev => 
        prev.filter(product => 
          product.category && filters.categories.includes(product.category)
        )
      );
    }
  }, [filters, sortOption]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return {
    queryParam,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    searchResults,
    isLoading,
    handleSearch
  };
};
