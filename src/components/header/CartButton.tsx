
import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartAdapter';

export const CartButton: React.FC = () => {
  const { itemCount, totalAmount } = useCart();
  
  return (
    <div className="flex items-center flex-shrink-0">
      {/* Track Order Link */}
      <Link to="/track-order" className="flex items-center mr-6 text-bahola-blue-500 hover:text-bahola-blue-700">
        <Package size={22} className="mr-1" />
        <span className="hidden md:inline">Track Order</span>
      </Link>
      
      {/* Cart Button */}
      <Link to="/cart" className="relative flex items-center mr-6">
        <ShoppingCart size={24} className="text-bahola-blue-500" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-bahola-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
        <span className="ml-2 hidden md:block">₹{totalAmount.toLocaleString()}</span>
      </Link>
    </div>
  );
};
