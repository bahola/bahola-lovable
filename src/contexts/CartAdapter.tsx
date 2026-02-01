import React, { createContext, useContext, ReactNode } from 'react';
import { useSwellCart } from './SwellCartContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
  discountPercentage?: number;
  taxStatus?: 'taxable' | 'non-taxable';
  taxClass?: '0' | '5' | '12';
}

interface AppliedCoupon {
  code: string;
  discountTotal: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  subtotal: number;
  discountTotal: number;
  appliedCoupon: AppliedCoupon | null;
  addToCart: (
    item: Omit<CartItem, 'quantity'>,
    quantity?: number,
    options?: {
      variant_id?: string;
      option_value_ids?: string[];
      options?: Record<string, any>;
    }
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getDiscountedPrice: (item: CartItem) => number;
  getSubtotal: () => number;
  getTotalTax: () => number;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  updateCart: (data: any) => Promise<any>;
  submitOrder: () => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartAdapterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    items: swellItems, 
    totalItems, 
    totalPrice,
    subtotal: swellSubtotal,
    discountTotal,
    appliedCoupon,
    addItem,
    updateQuantity: swellUpdateQuantity,
    removeItem,
    clearCart: swellClearCart,
    applyCoupon: swellApplyCoupon,
    removeCoupon: swellRemoveCoupon,
    updateCart: swellUpdateCart,
    submitOrder: swellSubmitOrder,
  } = useSwellCart();

  // Transform Swell items to match the old cart format
  const items: CartItem[] = swellItems.map(item => ({
    id: item.product_id,
    name: item.product?.name || 'Unknown Product',
    price: item.price,
    quantity: item.quantity,
    image: item.product?.image || '/placeholder.svg',
    originalPrice: undefined,
    discountPercentage: undefined,
    taxStatus: 'taxable' as const,
    taxClass: '5' as const
  }));

  // Swell Frontend API is strict about what can be sent when adding cart items.
  // Do NOT send custom fields like name/price/image or Swell will reject the request.
  const sanitizeCartOptions = (options?: {
    variant_id?: string;
    option_value_ids?: string[];
    options?: Record<string, any>;
  }) => {
    if (!options) return undefined;
    const cleaned: Record<string, any> = {};
    if (typeof options.variant_id === 'string') cleaned.variant_id = options.variant_id;
    if (Array.isArray(options.option_value_ids)) cleaned.option_value_ids = options.option_value_ids;
    if (options.options && typeof options.options === 'object') cleaned.options = options.options;
    return Object.keys(cleaned).length ? cleaned : undefined;
  };

  const addToCart = (
    item: Omit<CartItem, 'quantity'>,
    quantity: number = 1,
    options?: {
      variant_id?: string;
      option_value_ids?: string[];
      options?: Record<string, any>;
    }
  ) => {
    addItem(item.id, quantity, sanitizeCartOptions(options));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = swellItems.find(i => i.product_id === id);
    if (item) {
      swellUpdateQuantity(item.id, quantity);
    }
  };

  const removeFromCart = (id: string) => {
    const item = swellItems.find(i => i.product_id === id);
    if (item) {
      removeItem(item.id);
    }
  };

  const getDiscountedPrice = (item: CartItem): number => {
    if (item.originalPrice && item.discountPercentage) {
      return item.originalPrice * (1 - item.discountPercentage / 100);
    }
    return item.price;
  };

  const getSubtotal = (): number => {
    // Use Swell's subtotal if available, otherwise calculate
    if (swellSubtotal > 0) return swellSubtotal;
    return items.reduce((sum, item) => sum + (getDiscountedPrice(item) * item.quantity), 0);
  };

  const getTotalTax = (): number => {
    return items.reduce((sum, item) => {
      if (item.taxStatus === 'non-taxable') return sum;
      const taxRate = parseInt(item.taxClass || '5') / 100;
      const itemTotal = getDiscountedPrice(item) * item.quantity;
      return sum + (itemTotal * taxRate);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: totalItems,
        totalAmount: totalPrice,
        subtotal: swellSubtotal || getSubtotal(),
        discountTotal,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart: swellClearCart,
        getDiscountedPrice,
        getSubtotal,
        getTotalTax,
        applyCoupon: swellApplyCoupon,
        removeCoupon: swellRemoveCoupon,
        updateCart: swellUpdateCart,
        submitOrder: swellSubmitOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartAdapterProvider');
  }
  return context;
};
