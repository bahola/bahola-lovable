
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { ProductCard } from '@/components/ProductCard';
import { SearchResultsBar } from '@/components/search/SearchResultsBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchSorting } from '@/components/search/SearchSorting';
import { NoResults } from '@/components/search/NoResults';
import { useSearchResults } from '@/hooks/useSearchResults';
import { Loader2 } from 'lucide-react';

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
