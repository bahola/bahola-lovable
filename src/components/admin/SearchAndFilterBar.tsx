
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchAndFilterBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchAndFilterBar = ({ searchTerm, onSearchChange }: SearchAndFilterBarProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default SearchAndFilterBar;
