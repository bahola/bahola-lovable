
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchResultsBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export const SearchResultsBar: React.FC<SearchResultsBarProps> = ({ 
  searchValue, 
  setSearchValue, 
  onSearch 
}) => {
  return (
    <form onSubmit={onSearch} className="relative max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search for remedies, conditions, or brands..."
        className="pl-10 pr-4 py-3 w-full"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <SearchIcon
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Button 
        type="submit" 
        className="absolute right-0 top-0 rounded-l-none h-full"
      >
        Search
      </Button>
    </form>
  );
};
