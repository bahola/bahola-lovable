
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const searchConcern = queryParams.get('concern') || '';
  
  const [query, setQuery] = React.useState(searchQuery || searchConcern);
  
  // This would typically be fetched from an API based on the search query
  const results = Array(8).fill(null).map((_, index) => ({
    id: `result-${index}`,
    name: `Product Result ${index + 1}`,
    description: 'A high-quality homeopathic remedy for natural healing',
    price: Math.floor(Math.random() * 500) + 100,
    image: '/placeholder.svg',
    discountPercentage: index % 4 === 0 ? 15 : 0,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 100)
  }));
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically update the URL and trigger a new search
    console.log('Searching for:', query);
  };
  
  return (
    <PageLayout 
      title={searchConcern ? `${searchConcern} Remedies` : "Search Results"} 
      description={searchQuery ? `Results for "${searchQuery}"` : (searchConcern ? `Browse our homeopathic remedies for ${searchConcern}` : "Find the perfect homeopathic remedy")}
    >
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex w-full max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for remedies, symptoms, or health concerns..."
              className="pl-10 py-6"
            />
          </div>
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>
      </div>
      
      {/* Filter Tags (if searching by concern) */}
      {searchConcern && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-semibold mr-2">Filters:</h2>
            <div className="bg-bahola-blue-100 text-bahola-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
              {searchConcern}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 ml-1 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-bahola-neutral-600">
            Showing homeopathic remedies commonly used for {searchConcern.toLowerCase()} concerns.
          </p>
        </div>
      )}
      
      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-bahola-neutral-600">
          {results.length} results found
        </p>
        
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <select className="border rounded-md px-3 py-1">
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
      
      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {results.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            discountPercentage={product.discountPercentage}
            rating={parseFloat(product.rating)}
            reviewCount={product.reviewCount}
            link={`/product/${product.id}`}
          />
        ))}
      </div>
      
      {/* No Results */}
      {results.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
          <p className="text-bahola-neutral-600 mb-6">
            We couldn't find any products that match your search.
          </p>
          <div className="space-y-4">
            <p className="font-medium">Suggestions:</p>
            <ul className="list-disc text-left max-w-md mx-auto">
              <li>Check your spelling</li>
              <li>Try using more general keywords</li>
              <li>Try browsing by category instead</li>
              <li>Contact our experts for personalized recommendations</li>
            </ul>
          </div>
          <Button className="mt-8" asChild>
            <a href="/categories">Browse All Categories</a>
          </Button>
        </div>
      )}
      
      {/* Related Searches */}
      <div className="mt-12 bg-bahola-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Related Searches</h2>
        <div className="flex flex-wrap gap-3">
          {['Allergies', 'Respiratory Support', 'Digestion', 'Sleep Aid', 'Stress Relief', 'Immunity Boosters'].map(term => (
            <a 
              key={term} 
              href={`/search?q=${encodeURIComponent(term)}`}
              className="bg-white hover:bg-bahola-blue-100 border border-bahola-blue-200 px-4 py-2 rounded-full transition-colors"
            >
              {term}
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchResults;
