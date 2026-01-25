import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSwellAuth } from '@/contexts/SwellAuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string | null;
  product_image: string | null;
  product_price: number | null;
  added_at: string | null;
}

interface SwellProduct {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

export const useSwellWishlist = () => {
  const { user, isAuthenticated } = useSwellAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Use email as user identifier since Swell auth is separate from Supabase
  const userId = user?.email || user?.id;

  // Query wishlist items
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['swell-wishlist', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('swell_wishlist')
        .select('*')
        .eq('user_id', userId)
        .order('added_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching wishlist:', error);
        return [];
      }
      return (data || []) as WishlistItem[];
    },
    enabled: !!userId
  });

  // Add to wishlist
  const addToWishlist = async (product: SwellProduct) => {
    if (!isAuthenticated || !userId) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to your wishlist.",
        variant: "destructive"
      });
      navigate('/login', { state: { from: window.location.pathname, message: 'Please login to add items to your wishlist' } });
      return false;
    }

    // Check if already in wishlist
    const existing = wishlistItems.find(item => item.product_id === product.id);
    if (existing) {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist.`,
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('swell_wishlist')
        .insert({
          user_id: userId,
          product_id: product.id,
          product_name: product.name,
          product_image: product.image || null,
          product_price: product.price || null
        });

      if (error) throw error;

      // Invalidate cache to refresh wishlist
      queryClient.invalidateQueries({ queryKey: ['swell-wishlist', userId] });

      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('swell_wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;

      // Invalidate cache to refresh wishlist
      queryClient.invalidateQueries({ queryKey: ['swell-wishlist', userId] });

      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  // Toggle wishlist (add if not present, remove if present)
  const toggleWishlist = async (product: SwellProduct) => {
    if (isInWishlist(product.id)) {
      return removeFromWishlist(product.id);
    } else {
      return addToWishlist(product);
    }
  };

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    wishlistCount: wishlistItems.length
  };
};
