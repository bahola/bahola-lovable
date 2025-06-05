
import React from 'react';
import { Filter, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HealthConcernsToolbarProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  concernsCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const HealthConcernsToolbar: React.FC<HealthConcernsToolbarProps> = ({
  showFilters,
  onToggleFilters,
  concernsCount,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="lg:hidden"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
          <span className="text-gray-600">
            {concernsCount} diseases found
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={viewMode === 'grid' ? 'bg-gray-100' : ''}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={viewMode === 'list' ? 'bg-gray-100' : ''}
            >
              <List size={16} />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-bahola-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="alphabetical">A-Z</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
