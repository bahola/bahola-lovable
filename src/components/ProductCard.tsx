
import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
  }
}

export const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-bahola-neutral-200 transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain p-4 bg-bahola-neutral-50"
        />
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-bahola-blue-50 transition-colors">
          <Heart size={18} className="text-bahola-neutral-600 hover:text-bahola-blue-500" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            <Star size={16} className="fill-yellow-400" />
            <span className="text-sm ml-1 text-bahola-neutral-700">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-2 text-bahola-neutral-800">{product.name}</h3>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-bahola-blue-600">₹{product.price}</span>
          <Button size="sm" className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2">
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
