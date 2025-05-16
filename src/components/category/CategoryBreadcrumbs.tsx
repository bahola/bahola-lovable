
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryBreadcrumbsProps {
  categoryId?: string;
  subcategoryId?: string;
  isConcernPage: boolean;
  formattedName: string;
}

export const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({
  categoryId,
  subcategoryId,
  isConcernPage,
  formattedName
}) => {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-2">
      <Link to="/" className="hover:text-bahola-blue-600">Home</Link>
      <ChevronRight size={14} className="mx-1" />
      
      {isConcernPage ? (
        <>
          <Link to="/categories" className="hover:text-bahola-blue-600">Health Concerns</Link>
          <ChevronRight size={14} className="mx-1" />
        </>
      ) : (
        <>
          <Link to="/categories" className="hover:text-bahola-blue-600">Categories</Link>
          <ChevronRight size={14} className="mx-1" />
          {subcategoryId && (
            <>
              <Link to={`/category/${categoryId}`} className="hover:text-bahola-blue-600">{formattedName}</Link>
              <ChevronRight size={14} className="mx-1" />
            </>
          )}
        </>
      )}
      
      <span className="text-bahola-neutral-900">
        {subcategoryId ? `${subcategoryId.toUpperCase()} Products` : formattedName}
      </span>
    </div>
  );
};
