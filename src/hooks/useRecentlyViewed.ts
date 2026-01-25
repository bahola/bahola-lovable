import { useState, useEffect } from 'react';

interface RecentlyViewedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category?: string;
}

const STORAGE_KEY = 'recently_viewed_products';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addToRecentlyViewed = (product: RecentlyViewedProduct) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id);
      // Add to beginning
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getRecentlyViewed = (excludeId?: string, limit: number = 5): RecentlyViewedProduct[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      const products: RecentlyViewedProduct[] = JSON.parse(stored);
      return products.filter(p => p.id !== excludeId).slice(0, limit);
    } catch {
      return [];
    }
  };

  return { recentlyViewed, addToRecentlyViewed, getRecentlyViewed };
};
