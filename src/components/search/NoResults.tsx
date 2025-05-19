
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  queryParam: string;
}

export const NoResults: React.FC<NoResultsProps> = ({ queryParam }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No results found</h3>
      <p className="text-gray-600 mb-4">
        We couldn't find any products matching "{queryParam}". 
        Try different keywords or browse our categories.
      </p>
      <Button>Browse Categories</Button>
    </div>
  );
};
