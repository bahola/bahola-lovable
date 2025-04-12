
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Search as SearchIcon, X, Filter } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get('q') || '';
  
  const [searchValue, setSearchValue] = React.useState(queryParam);
  const [filters, setFilters] = React.useState({
    categories: [] as string[],
    priceRange: [0, 5000] as [number, number],
    rating: 0,
  });
  
  // Mock search results
  const searchResults = [
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
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would update the URL and trigger a new search
    console.log(`Searching for: ${searchValue}`);
  };

  return (
    <PageLayout 
      title="Search Results" 
      description={queryParam ? `Search results for "${queryParam}"` : 'Browse our products'}
    >
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Search for remedies, conditions, or brands..."
            className="pl-10 pr-4 py-3 w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Button 
            type="submit" 
            className="absolute right-0 top-0 rounded-l-none h-full"
          >
            Search
          </Button>
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-bahola-blue-600 hover:text-bahola-blue-800 h-auto p-0"
              >
                Reset
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {['Mother Tinctures', 'Dilutions', 'Biochemics', 'Bach Flower', 'Combination Formulas'].map(
                    (category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          className="h-4 w-4 text-bahola-blue-600 focus:ring-bahola-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {category}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 text-sm border rounded"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 text-sm border rounded"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                  >
                    Apply
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Customer Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        name="rating"
                        className="h-4 w-4 text-bahola-blue-600 focus:ring-bahola-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm text-gray-700 flex items-center"
                      >
                        {rating}+ Stars
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Search results */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {searchResults.length} results found for "{queryParam}"
              </p>
              <select className="p-2 text-sm border rounded-md">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any products matching "{queryParam}". 
                Try different keywords or browse our categories.
              </p>
              <Button>Browse Categories</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((product) => (
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
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchResults;
