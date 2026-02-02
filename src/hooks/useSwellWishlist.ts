import { useQuery, useQueryClient } from '@tanstack/react-query';
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

const WISHLIST_API_URL = 'https://vjkhsdwavbswcoyfgyvg.supabase.co/functions/v1/wishlist-operations';

// Helper to call wishlist edge function
async function callWishlistApi(
  action: string,
  userEmail: string,
  data?: { product?: SwellProduct; productId?: string }
): Promise<{ success?: boolean; items?: WishlistItem[]; error?: string; alreadyExists?: boolean; inWishlist?: boolean }> {
  const response = await fetch(WISHLIST_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Include cookies for Swell session verification
    body: JSON.stringify({
      action,
      userEmail,
      ...data,
    }),
  });

  const result = await response.json();
  
  if (!response.ok && response.status !== 409) {
    throw new Error(result.error || 'Wishlist operation failed');
  }
  
  return result;
}

export const useSwellWishlist = () => {
  const { user, isAuthenticated } = useSwellAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Use email as user identifier since Swell auth is separate from Supabase
  const userId = user?.email || user?.id;
  const userEmail = user?.email;

  // Query wishlist items via edge function
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['swell-wishlist', userId],
    queryFn: async () => {
      if (!userId || !userEmail) return [];

      try {
        const result = await callWishlistApi('list', userEmail);
        return (result.items || []) as WishlistItem[];
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        return [];
      }
    },
    enabled: !!userId && !!isAuthenticated && !!userEmail
  });

  // Add to wishlist
  const addToWishlist = async (product: SwellProduct) => {
    if (!isAuthenticated || !userId || !userEmail) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to your wishlist.",
        variant: "destructive"
      });
      navigate('/login', { state: { from: window.location.pathname, message: 'Please login to add items to your wishlist' } });
      return false;
    }

    try {
      const result = await callWishlistApi('add', userEmail, { product });
      
      if (result.alreadyExists) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist.`,
        });
        return false;
      }

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
    if (!userId || !userEmail) return false;

    try {
      await callWishlistApi('remove', userEmail, { productId });

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

  // Check if product is in wishlist (uses local cache)
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
