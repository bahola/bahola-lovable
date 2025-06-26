
'use client'; // This will be needed in Next.js for client components

import { useState, useEffect } from 'react';

// Client-side data management hook
export const useClientSideData = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Client-side only effects
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return {
    cartItems,
    setCartItems,
    user,
    setUser,
    searchQuery,
    setSearchQuery
  };
};

// Search hook that works on client-side
export const useClientSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // This would be replaced with actual API call
      const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json());
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    isLoading,
    performSearch
  };
};
