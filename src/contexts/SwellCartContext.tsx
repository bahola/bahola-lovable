import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { swell } from '@/integrations/swell/client';
import { useToast } from '@/hooks/use-toast';

const CART_SESSION_KEY = 'swell_checkout_id';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image?: string;
  };
}

interface SwellCartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addItem: (productId: string, quantity?: number, options?: any) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const SwellCartContext = createContext<SwellCartContextType | undefined>(undefined);

// Helper to update state from cart data
const parseCartData = (cart: any): { items: CartItem[]; totalItems: number; totalPrice: number } => {
  if (cart && cart.items) {
    const formattedItems: CartItem[] = cart.items.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      product: {
        name: item.product?.name || 'Unknown Product',
        image: item.product?.images?.[0]?.file?.url
      }
    }));
    return {
      items: formattedItems,
      totalItems: cart.item_quantity || 0,
      totalPrice: cart.grand_total || 0
    };
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};

export const SwellCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const refreshCart = async () => {
    try {
      setLoading(true);
      
      // First try to get the current cart
      let cart = await swell.cart.get();
      
      // If no cart, try to recover from stored checkout_id
      if (!cart || !cart.items || cart.items.length === 0) {
        const storedCheckoutId = localStorage.getItem(CART_SESSION_KEY);
        if (storedCheckoutId) {
          console.log('[SwellCart] Recovering cart with checkout_id:', storedCheckoutId);
          cart = await swell.cart.recover(storedCheckoutId);
        }
      }
      
      // Store checkout_id for future recovery
      if (cart?.checkout_id) {
        localStorage.setItem(CART_SESSION_KEY, cart.checkout_id);
      }
      
      const parsed = parseCartData(cart);
      setItems(parsed.items);
      setTotalItems(parsed.totalItems);
      setTotalPrice(parsed.totalPrice);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to load cart',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: string, quantity: number = 1, options?: any) => {
    try {
      console.log('[SwellCart] Adding item:', { productId, quantity, options });
      
      const itemPayload = {
        product_id: productId,
        quantity,
        ...options
      };
      
      console.log('[SwellCart] Item payload:', itemPayload);
      
      const result = await swell.cart.addItem(itemPayload);
      
      console.log('[SwellCart] Add item result:', result);
      
      // Store checkout_id immediately after adding item
      if (result?.checkout_id) {
        localStorage.setItem(CART_SESSION_KEY, result.checkout_id);
      }
      
      // Update state directly from the result instead of refetching
      const parsed = parseCartData(result);
      setItems(parsed.items);
      setTotalItems(parsed.totalItems);
      setTotalPrice(parsed.totalPrice);
      
      toast({
        title: 'Success',
        description: 'Item added to cart'
      });
    } catch (error) {
      console.error('[SwellCart] Error adding to cart:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add item to cart',
        variant: 'destructive'
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await swell.cart.updateItem(itemId, { quantity });
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: 'Error',
        description: 'Failed to update quantity',
        variant: 'destructive'
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await swell.cart.removeItem(itemId);
      await refreshCart();
      
      toast({
        title: 'Success',
        description: 'Item removed from cart'
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive'
      });
    }
  };

  const clearCart = async () => {
    try {
      await swell.cart.setItems([]);
      localStorage.removeItem(CART_SESSION_KEY);
      setItems([]);
      setTotalItems(0);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <SwellCartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart
      }}
    >
      {children}
    </SwellCartContext.Provider>
  );
};

export const useSwellCart = () => {
  const context = useContext(SwellCartContext);
  if (!context) {
    throw new Error('useSwellCart must be used within SwellCartProvider');
  }
  return context;
};
