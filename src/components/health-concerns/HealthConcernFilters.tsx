
import React from 'react';
import { categoryInfo } from '@/data/healthConcernsData';

interface HealthConcernFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const HealthConcernFilters: React.FC<HealthConcernFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-bahola-navy-950 mb-4">Filter by Category</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-bahola-blue-100 text-bahola-blue-700 font-medium'
              : 'text-bahola-neutral-700 hover:bg-bahola-neutral-100'
          }`}
        >
          All Categories
        </button>
        
        {Object.entries(categoryInfo).map(([key, info]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
              selectedCategory === key
                ? 'bg-bahola-blue-100 text-bahola-blue-700 font-medium'
                : 'text-bahola-neutral-700 hover:bg-bahola-neutral-100'
            }`}
          >
            {info.name}
          </button>
        ))}
      </div>
    </div>
  );
};
