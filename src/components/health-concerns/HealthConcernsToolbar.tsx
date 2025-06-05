
import React from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HealthConcernsToolbarProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  concernsCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const HealthConcernsToolbar: React.FC<HealthConcernsToolbarProps> = ({
  showFilters,
  onToggleFilters,
  concernsCount,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  searchQuery = '',
  onSearchChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="lg:hidden"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          
          {onSearchChange && (
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search health concerns..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {concernsCount} result{concernsCount !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none"
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none"
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
