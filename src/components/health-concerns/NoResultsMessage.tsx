
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoResultsMessageProps {
  onClearFilters: () => void;
}

export const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  onClearFilters,
}) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">No diseases found matching your criteria.</p>
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="mt-4"
      >
        Clear Filters
      </Button>
    </div>
  );
};
