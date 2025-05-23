
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { ProductCard } from '@/components/ProductCard';
import { SearchResultsBar } from '@/components/search/SearchResultsBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchSorting } from '@/components/search/SearchSorting';
import { NoResults } from '@/components/search/NoResults';
import { useSearchResults } from '@/hooks/useSearchResults';
import { Loader2, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SearchResults = () => {
  const {
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
  } = useSearchResults();

  return (
    <PageLayout 
      title="Search Results" 
      description={queryParam ? `Search results for "${queryParam}"` : 'Browse our products'}
    >
      <div className="mb-6">
        <SearchResultsBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <SearchFilters 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </aside>
        
        {/* Search results */}
        <div className="flex-1">
          <SearchSorting
            resultsCount={searchResults.length}
            queryParam={queryParam}
            onSortChange={setSortOption}
            sortOption={sortOption}
          />
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-bahola-blue-500" />
            </div>
          ) : searchResults.length === 0 ? (
            <NoResults queryParam={queryParam} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <div key={product.id} className="relative">
                  {/* Category and Subcategory badges */}
                  {(product.category || product.subcategory) && (
                    <div className="absolute top-2 left-2 z-10 flex gap-1 flex-wrap">
                      {product.category && (
                        <Badge variant="secondary" className="bg-bahola-blue-100 text-bahola-blue-700 hover:bg-bahola-blue-200">
                          <Tag className="h-3 w-3 mr-1" />
                          {product.category}
                        </Badge>
                      )}
                      {product.subcategory && (
                        <Badge variant="outline" className="bg-white text-gray-700 border-gray-200">
                          {product.subcategory}
                        </Badge>
                      )}
                    </div>
                  )}
                  <ProductCard
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    imageSrc={product.imageSrc}
                    discountPercentage={product.discountPercentage}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    url={product.url}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchResults;
