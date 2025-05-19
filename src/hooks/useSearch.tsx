
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [searchQuery, navigate]);

  return {
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    handleSearch,
    clearSearch: () => setSearchQuery('')
  };
}
