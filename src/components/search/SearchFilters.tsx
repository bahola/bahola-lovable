
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    rating: number;
  }) => void;
  filters: {
    categories: string[];
    priceRange: [number, number];
    rating: number;
  };
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];

    onFilterChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating
    });
  };

  const handlePriceRangeChange = (min: number | undefined, max: number | undefined) => {
    onFilterChange({
      ...filters,
      priceRange: [min || 0, max || 5000]
    });
  };

  const handleReset = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 5000],
      rating: 0
    });
  };

  return (
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
          onClick={handleReset}
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
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
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
                defaultValue={filters.priceRange[0] || undefined}
                onChange={(e) => handlePriceRangeChange(
                  e.target.value ? Number(e.target.value) : undefined,
                  filters.priceRange[1]
                )}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 text-sm border rounded"
                defaultValue={filters.priceRange[1] || undefined}
                onChange={(e) => handlePriceRangeChange(
                  filters.priceRange[0],
                  e.target.value ? Number(e.target.value) : undefined
                )}
              />
            </div>
            <Button 
              size="sm" 
              className="w-full mt-2"
              onClick={() => handlePriceRangeChange(
                filters.priceRange[0],
                filters.priceRange[1]
              )}
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
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
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
  );
};
