
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onSearch,
  onClear
}) => {
  const navigate = useNavigate();
  const [inputFocused, setInputFocused] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <form onSubmit={onSearch} className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 rounded-full"
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
        
        {searchQuery && onClear && (
          <Button 
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
            onClick={onClear}
          >
            <X size={16} />
          </Button>
        )}
        
        <Button 
          type="submit" 
          className="absolute right-0 top-0 rounded-l-none rounded-r-full h-full"
        >
          Search
        </Button>
      </div>
    </form>
  );
};
