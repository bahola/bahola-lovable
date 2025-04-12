
import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';

interface CartButtonProps {
  cartItems: number;
  cartTotal: number;
}

export const CartButton: React.FC<CartButtonProps> = ({ cartItems, cartTotal }) => {
  return (
    <div className="flex items-center flex-shrink-0">
      {/* Track Order Link */}
      <a href="/track-order" className="flex items-center mr-6 text-bahola-blue-500 hover:text-bahola-blue-700">
        <Package size={22} className="mr-1" />
        <span className="hidden md:inline">Track Order</span>
      </a>
      
      {/* Cart Button */}
      <a href="/cart" className="relative flex items-center mr-6">
        <ShoppingCart size={24} className="text-bahola-blue-500" />
        <span className="absolute -top-2 -right-2 bg-bahola-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems}
        </span>
        <span className="ml-2 hidden md:block">₹{cartTotal.toLocaleString()}</span>
      </a>
    </div>
  );
};
