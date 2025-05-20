
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    clearSearch
  };
};
