
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BlogProductLinkProps {
  productId?: string;
  productName?: string;
  category?: string;
  healthConcern?: string;
  className?: string;
}

export const BlogProductLink: React.FC<BlogProductLinkProps> = ({
  productId,
  productName,
  category,
  healthConcern,
  className = ''
}) => {
  const generateUrl = () => {
    const baseUrl = 'https://bahola-labs.lovable.app';
    
    if (productId) {
      return `${baseUrl}/product/${productId}`;
    }
    
    if (category) {
      return `${baseUrl}/products/${category.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    if (healthConcern) {
      return `${baseUrl}/concern/${healthConcern.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    return `${baseUrl}/products`;
  };

  const getLinkText = () => {
    if (productName) {
      return `Shop ${productName}`;
    }
    
    if (category) {
      return `Browse ${category}`;
    }
    
    if (healthConcern) {
      return `Find Remedies for ${healthConcern}`;
    }
    
    return 'Shop All Products';
  };

  return (
    <Button 
      asChild 
      className={`bg-bahola-blue-600 hover:bg-bahola-blue-700 text-white ${className}`}
    >
      <a 
        href={generateUrl()} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        {getLinkText()}
        <ArrowRight size={16} />
      </a>
    </Button>
  );
};
