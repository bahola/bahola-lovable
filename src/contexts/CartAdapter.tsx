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

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getDiscountedPrice: (item: CartItem) => number;
  getSubtotal: () => number;
  getTotalTax: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartAdapterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    items: swellItems, 
    totalItems, 
    totalPrice,
    addItem,
    updateQuantity: swellUpdateQuantity,
    removeItem,
    clearCart: swellClearCart
  } = useSwellCart();

  // Transform Swell items to match the old cart format
  const items: CartItem[] = swellItems.map(item => ({
    id: item.product_id,
    name: item.product.name,
    price: item.price,
    quantity: item.quantity,
    image: item.product.image || '/placeholder.svg',
    originalPrice: undefined,
    discountPercentage: undefined,
    taxStatus: 'taxable' as const,
    taxClass: '5' as const
  }));

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    addItem(item.id, quantity, {
      name: item.name,
      price: item.price,
      image: item.image
    });
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
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart: swellClearCart,
        getDiscountedPrice,
        getSubtotal,
        getTotalTax
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
