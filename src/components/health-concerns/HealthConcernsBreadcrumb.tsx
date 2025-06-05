
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HealthConcernsBreadcrumbProps {
  categoryName?: string;
  subcategoryName?: string;
  categoryPath?: string;
}

export const HealthConcernsBreadcrumb: React.FC<HealthConcernsBreadcrumbProps> = ({
  categoryName,
  subcategoryName,
  categoryPath
}) => {
  return (
    <nav className="text-sm text-gray-600 mb-6">
      <div className="flex items-center">
        <Link to="/" className="hover:text-bahola-blue-600">Home</Link>
        <ChevronRight size={14} className="mx-1" />
        <Link to="/health-concerns" className="hover:text-bahola-blue-600">Health Concerns</Link>
        
        {categoryName && (
          <>
            <ChevronRight size={14} className="mx-1" />
            {categoryPath ? (
              <Link to={categoryPath} className="hover:text-bahola-blue-600">{categoryName}</Link>
            ) : (
              <span className="text-gray-900">{categoryName}</span>
            )}
          </>
        )}
        
        {subcategoryName && (
          <>
            <ChevronRight size={14} className="mx-1" />
            <span className="text-gray-900">{subcategoryName}</span>
          </>
        )}
        
        {!categoryName && !subcategoryName && (
          <>
            <ChevronRight size={14} className="mx-1" />
            <span className="text-gray-900">All Health Concerns</span>
          </>
        )}
      </div>
    </nav>
  );
};
