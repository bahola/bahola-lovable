
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface HealthConcernFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const HealthConcernFilters: React.FC<HealthConcernFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    { id: 'all', name: 'All Concerns', count: 120 },
    { id: 'digestive', name: 'Digestive Health', count: 25 },
    { id: 'respiratory', name: 'Respiratory', count: 18 },
    { id: 'mental-health', name: 'Mental Health', count: 22 },
    { id: 'skin', name: 'Skin Conditions', count: 15 },
    { id: 'womens-health', name: "Women's Health", count: 12 },
    { id: 'pain', name: 'Pain Management', count: 16 },
    { id: 'immune', name: 'Immune System', count: 8 },
    { id: 'allergies', name: 'Allergies', count: 10 },
    { id: 'sleep', name: 'Sleep Disorders', count: 7 },
    { id: 'childrens-health', name: "Children's Health", count: 14 },
  ];

  const popularSearches = [
    'Anxiety',
    'Insomnia',
    'Digestive Issues',
    'Allergies',
    'Headaches',
    'Skin Problems',
    'Cold & Flu',
    'Joint Pain',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Filter by Category</h3>
      
      <div className="space-y-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-bahola-blue-50 text-bahola-blue-700 border-l-4 border-bahola-blue-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={selectedCategory === category.id ? 'font-medium' : ''}>
                {category.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-3">Popular Searches</h4>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-gray-50 text-xs"
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
        <p className="text-sm text-gray-600 mb-3">
          Can't find what you're looking for? Our homeopathy experts are here to help.
        </p>
        <button className="w-full bg-bahola-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-bahola-blue-700 transition-colors">
          Contact Expert
        </button>
      </div>
    </div>
  );
};
