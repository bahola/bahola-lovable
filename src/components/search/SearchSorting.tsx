
import React from 'react';

interface SearchSortingProps {
  resultsCount: number;
  queryParam: string;
  onSortChange: (sortOption: string) => void;
  sortOption: string;
}

export const SearchSorting: React.FC<SearchSortingProps> = ({ 
  resultsCount, 
  queryParam, 
  onSortChange,
  sortOption
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {resultsCount} results found for "{queryParam}"
        </p>
        <select 
          className="p-2 text-sm border rounded-md"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};
