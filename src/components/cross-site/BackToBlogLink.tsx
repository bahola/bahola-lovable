
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

interface BackToBlogLinkProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  article?: string;
}

export const BackToBlogLink: React.FC<BackToBlogLinkProps> = ({
  className = '',
  variant = 'outline',
  article
}) => {
  const blogUrl = article 
    ? `https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b#${article}`
    : 'https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b';

  return (
    <Button 
      asChild 
      variant={variant}
      className={`border-red-200 text-red-600 hover:bg-red-50 ${className}`}
    >
      <a 
        href={blogUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        <Heart size={16} className="text-red-500" />
        <span>Read More on I ❤️ HOMEOPATHY</span>
        <ArrowRight size={16} />
      </a>
    </Button>
  );
};
