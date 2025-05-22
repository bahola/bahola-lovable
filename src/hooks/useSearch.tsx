
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  
  // Debounce search input to avoid too many navigations while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce time
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Navigate when debounced query changes (if not empty)
  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, navigate]);
  
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
