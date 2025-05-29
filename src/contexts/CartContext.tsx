
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  quantity: number;
  taxStatus?: 'taxable' | 'non-taxable';
  taxClass?: '0' | '5' | '12';
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getDiscountedPrice: (item: CartItem) => number;
  calculateTax: (item: CartItem) => number;
  getSubtotal: () => number;
  getTotalTax: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bahola_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('bahola_cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    console.log('Saving cart to localStorage:', items);
    localStorage.setItem('bahola_cart', JSON.stringify(items));
  }, [items]);

  const getDiscountedPrice = (item: CartItem): number => {
    if (item.discountPercentage && item.originalPrice) {
      return item.originalPrice * (1 - item.discountPercentage / 100);
    }
    return item.price;
  };

  const calculateTax = (item: CartItem): number => {
    if (item.taxStatus === 'non-taxable') {
      return 0;
    }
    
    const itemPrice = getDiscountedPrice(item);
    const taxRate = parseFloat(item.taxClass || '5') / 100;
    return itemPrice * item.quantity * taxRate;
  };

  const getSubtotal = (): number => {
    return items.reduce((total, item) => {
      const itemPrice = getDiscountedPrice(item);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getTotalTax = (): number => {
    return items.reduce((total, item) => {
      return total + calculateTax(item);
    }, 0);
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, quantity = 1) => {
    console.log('Adding item to cart:', { newItem, quantity });
    
    if (!newItem.id || !newItem.name || !newItem.price) {
      console.error('Invalid item data:', newItem);
      return;
    }

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        console.log('Updated existing item:', updatedItems[existingItemIndex]);
        return updatedItems;
      } else {
        const newCartItem = { ...newItem, quantity };
        console.log('Added new item:', newCartItem);
        return [...prevItems, newCartItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    console.log('Removing item from cart:', id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    console.log('Updating quantity:', { id, quantity });
    
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = getSubtotal() + getTotalTax();

  const value: CartContextType = {
    items,
    itemCount,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getDiscountedPrice,
    calculateTax,
    getSubtotal,
    getTotalTax
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
