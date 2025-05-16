
import React from 'react';
import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryBreadcrumbs } from './CategoryBreadcrumbs';

interface CategoryPageHeaderProps {
  categoryId?: string;
  subcategoryId?: string;
  isConcernPage: boolean;
  formattedName: string;
  productCount: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
  categoryId,
  subcategoryId,
  isConcernPage,
  formattedName,
  productCount,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <div>
          <CategoryBreadcrumbs 
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            isConcernPage={isConcernPage}
            formattedName={formattedName}
          />
          <p className="text-sm text-gray-600">{productCount} products found</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === 'grid' ? 'bg-bahola-blue-50 text-bahola-blue-700' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === 'list' ? 'bg-bahola-blue-50 text-bahola-blue-700' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </Button>
          </div>
          
          <select className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest first</option>
            <option>Highest rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};
