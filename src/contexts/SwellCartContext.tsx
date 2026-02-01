import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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

interface AppliedCoupon {
  code: string;
  discountTotal: number;
}

interface SwellCartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  discountTotal: number;
  appliedCoupon: AppliedCoupon | null;
  loading: boolean;
  addItem: (productId: string, quantity?: number, options?: any) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  updateCart: (data: any) => Promise<any>;
  submitOrder: () => Promise<any>;
}

const SwellCartContext = createContext<SwellCartContextType | undefined>(undefined);

// Helper to update state from cart data
const parseCartData = (cart: any): { 
  items: CartItem[]; 
  totalItems: number; 
  totalPrice: number;
  subtotal: number;
  discountTotal: number;
  appliedCoupon: AppliedCoupon | null;
} => {
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
    
    // Extract coupon info from cart
    const appliedCoupon: AppliedCoupon | null = cart.coupon_code ? {
      code: cart.coupon_code,
      discountTotal: cart.discount_total || 0
    } : null;
    
    return {
      items: formattedItems,
      totalItems: cart.item_quantity || 0,
      totalPrice: cart.grand_total || 0,
      subtotal: cart.sub_total || 0,
      discountTotal: cart.discount_total || 0,
      appliedCoupon
    };
  }
  return { items: [], totalItems: 0, totalPrice: 0, subtotal: 0, discountTotal: 0, appliedCoupon: null };
};

export const SwellCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const updateStateFromCart = useCallback((cart: any) => {
    const parsed = parseCartData(cart);
    setItems(parsed.items);
    setTotalItems(parsed.totalItems);
    setTotalPrice(parsed.totalPrice);
    setSubtotal(parsed.subtotal);
    setDiscountTotal(parsed.discountTotal);
    setAppliedCoupon(parsed.appliedCoupon);
    
    // Store checkout_id for future recovery
    if (cart?.checkout_id) {
      localStorage.setItem(CART_SESSION_KEY, cart.checkout_id);
    }
  }, []);

  const refreshCart = useCallback(async () => {
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
      
      updateStateFromCart(cart);
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
  }, [toast, updateStateFromCart]);

  const addItem = useCallback(async (productId: string, quantity: number = 1, options?: any) => {
    try {
      console.log('[SwellCart] Adding item:', { productId, quantity, options });
      
      const itemPayload = {
        product_id: productId,
        quantity,
        ...options
      };
      
      const result = await swell.cart.addItem(itemPayload);
      console.log('[SwellCart] Add item result:', result);
      
      updateStateFromCart(result);
      
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
  }, [toast, updateStateFromCart]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      const result = await swell.cart.updateItem(itemId, { quantity });
      updateStateFromCart(result);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: 'Error',
        description: 'Failed to update quantity',
        variant: 'destructive'
      });
    }
  }, [toast, updateStateFromCart]);

  const removeItem = useCallback(async (itemId: string) => {
    try {
      const result = await swell.cart.removeItem(itemId);
      updateStateFromCart(result);
      
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
  }, [toast, updateStateFromCart]);

  const clearCart = useCallback(async () => {
    try {
      await swell.cart.setItems([]);
      localStorage.removeItem(CART_SESSION_KEY);
      setItems([]);
      setTotalItems(0);
      setTotalPrice(0);
      setSubtotal(0);
      setDiscountTotal(0);
      setAppliedCoupon(null);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, []);

  const applyCoupon = useCallback(async (code: string) => {
    try {
      console.log('[SwellCart] Applying coupon:', code);
      
      // First, ensure we have the current cart session by recovering it
      const storedCheckoutId = localStorage.getItem(CART_SESSION_KEY);
      if (storedCheckoutId) {
        console.log('[SwellCart] Recovering cart before applying coupon:', storedCheckoutId);
        await swell.cart.recover(storedCheckoutId);
      }
      
      // Now apply the coupon to the recovered cart
      const result = await swell.cart.applyCoupon(code);
      console.log('[SwellCart] Apply coupon result:', result);
      
      if (!result.coupon_code) {
        throw new Error('Invalid coupon code');
      }
      
      updateStateFromCart(result);
    } catch (error) {
      console.error('[SwellCart] Error applying coupon:', error);
      throw error;
    }
  }, [updateStateFromCart]);

  const removeCoupon = useCallback(async () => {
    try {
      console.log('[SwellCart] Removing coupon');
      const result = await swell.cart.removeCoupon();
      console.log('[SwellCart] Remove coupon result:', result);
      updateStateFromCart(result);
    } catch (error) {
      console.error('[SwellCart] Error removing coupon:', error);
      throw error;
    }
  }, [updateStateFromCart]);

  const updateCart = useCallback(async (data: any) => {
    try {
      console.log('[SwellCart] Updating cart:', data);
      const result = await swell.cart.update(data);
      console.log('[SwellCart] Update cart result:', result);
      updateStateFromCart(result);
      return result;
    } catch (error) {
      console.error('[SwellCart] Error updating cart:', error);
      throw error;
    }
  }, [updateStateFromCart]);

  const submitOrder = useCallback(async () => {
    try {
      console.log('[SwellCart] Submitting order');
      const result = await swell.cart.submitOrder();
      console.log('[SwellCart] Submit order result:', result);
      return result;
    } catch (error) {
      console.error('[SwellCart] Error submitting order:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <SwellCartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        subtotal,
        discountTotal,
        appliedCoupon,
        loading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
        applyCoupon,
        removeCoupon,
        updateCart,
        submitOrder,
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
