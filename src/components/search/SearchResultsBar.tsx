
import React, { useEffect, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Clear search function
  const clearSearch = () => {
    setSearchValue('');
  };
  
  return (
    <form onSubmit={onSearch} className="relative max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search for remedies, conditions, or brands..."
        className="pl-10 pr-16 py-3 w-full"
        value={searchValue}
        onChange={handleChange}
      />
      <SearchIcon
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      
      {searchValue && (
        <Button 
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-16 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
          onClick={clearSearch}
        >
          <X size={16} />
        </Button>
      )}
      
      <Button 
        type="submit" 
        className="absolute right-0 top-0 rounded-l-none h-full"
      >
        Search
      </Button>
    </form>
  );
};
