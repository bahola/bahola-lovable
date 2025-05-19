
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [sortOption, setSortOption] = useState('relevance');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    priceRange: [0, 5000],
    rating: 0,
  });

  // Mock search results - in a real app this would come from an API
  const mockSearchResults: Product[] = [
    {
      id: 'arnica-montana-30c',
      title: 'Arnica Montana 30C',
      description: 'For bruises, injuries and muscle soreness',
      price: 450,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Arnica+Montana',
      discountPercentage: 10,
      rating: 4.8,
      reviewCount: 124,
      url: '/product/arnica-montana-30c'
    },
    {
      id: 'belladonna-200c',
      title: 'Belladonna 200C',
      description: 'For fever, inflammation and acute conditions',
      price: 550,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Belladonna',
      discountPercentage: 0,
      rating: 4.7,
      reviewCount: 89,
      url: '/product/belladonna-200c'
    },
    {
      id: 'nux-vomica-30c',
      title: 'Nux Vomica 30C',
      description: 'For digestive issues and hangover',
      price: 380,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Nux+Vomica',
      discountPercentage: 5,
      rating: 4.9,
      reviewCount: 102,
      url: '/product/nux-vomica-30c'
    },
    {
      id: 'bach-rescue-remedy',
      title: 'Bach Flower Rescue Remedy',
      description: 'For stress, anxiety and emotional balance',
      price: 850,
      imageSrc: 'https://placehold.co/300x300/bahola-blue/white?text=Rescue+Remedy',
      discountPercentage: 0,
      rating: 4.9,
      reviewCount: 156,
      url: '/product/bach-rescue-remedy'
    }
  ];
  
  // This would be replaced with a real search function in a production app
  const [filteredResults, setFilteredResults] = useState<Product[]>(mockSearchResults);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let results = [...mockSearchResults];
    
    // Apply category filters
    if (filters.categories.length > 0) {
      // In a real app, this would filter by actual categories
      // This is just a mock implementation
      results = results.slice(0, 2);
    }
    
    // Apply price range filter
    results = results.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.rating > 0) {
      results = results.filter(product => product.rating >= filters.rating);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      // 'relevance' is the default, no sorting needed
    }
    
    setFilteredResults(results);
  }, [filters, sortOption]);

  return {
    queryParam,
    searchValue,
    setSearchValue,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    searchResults: filteredResults,
    handleSearch
  };
};
