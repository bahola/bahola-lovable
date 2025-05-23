
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResultsBar } from '@/components/search/SearchResultsBar';
import { SearchSorting } from '@/components/search/SearchSorting';
import { ProductGrid } from '@/components/category/ProductGrid';
import { NoResults } from '@/components/search/NoResults';
import { useSearchResults } from '@/hooks/useSearchResults';

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
    <PageLayout title="Search Results" description="Find the perfect homeopathic remedy">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <SearchFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </aside>
        
        <main className="flex-1">
          <SearchResultsBar 
            query={queryParam}
            resultCount={searchResults.length}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={handleSearch}
          />
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              {isLoading ? 'Searching...' : `${searchResults.length} products found`}
            </div>
            <SearchSorting 
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
          
          {isLoading ? (
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bahola-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching for products...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <NoResults searchTerm={queryParam} />
          ) : (
            <ProductGrid 
              products={searchResults}
              viewMode="grid"
              clearFilters={() => setFilters({ categories: [], priceRange: [0, 5000], rating: 0 })}
            />
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default SearchResults;
