
import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface ProductProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    rating: number;
    image: string;
  }
}

// Create a different interface that matches what's being used in CategoryPage and SearchResults
interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  url: string;
}

// Original ProductCard component
export const ProductCard: React.FC<ProductProps | ProductCardProps> = (props) => {
  // Check which type of props we received
  if ('product' in props) {
    // Handle the original ProductProps format
    const { product } = props;
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-bahola-neutral-200 transition-all duration-300 hover:shadow-lg">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative">
            <img 
              src={product.image || '/placeholder.svg'} 
              alt={product.name} 
              className="w-full h-48 object-contain p-4 bg-bahola-neutral-50"
            />
            <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-bahola-blue-50 transition-colors">
              <Heart size={18} className="text-bahola-neutral-600 hover:text-bahola-blue-500" />
            </button>
          </div>
        </Link>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              <Star size={16} className="fill-yellow-400" />
              <span className="text-sm ml-1 text-bahola-neutral-700">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-lg mb-2 text-bahola-neutral-800 hover:text-bahola-blue-600">{product.name}</h3>
          </Link>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-bahola-blue-600">₹{product.price}</span>
            <Button size="sm" className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2">
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    // Handle the CategoryPage/SearchResults format
    const { title, description, price, imageSrc, discountPercentage, rating, reviewCount, url } = props;
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-bahola-neutral-200 transition-all duration-300 hover:shadow-lg">
        <Link to={url} className="block">
          <div className="relative">
            <img 
              src={imageSrc || '/placeholder.svg'} 
              alt={title} 
              className="w-full h-48 object-contain p-4 bg-bahola-neutral-50"
            />
            <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-bahola-blue-50 transition-colors">
              <Heart size={18} className="text-bahola-neutral-600 hover:text-bahola-blue-500" />
            </button>
            {discountPercentage > 0 && (
              <div className="absolute top-3 left-3 bg-bahola-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {discountPercentage}% OFF
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              <Star size={16} className="fill-yellow-400" />
              <span className="text-sm ml-1 text-bahola-neutral-700">{rating}</span>
              <span className="text-xs ml-1 text-bahola-neutral-500">({reviewCount})</span>
            </div>
          </div>
          
          <Link to={url} className="block">
            <h3 className="font-medium text-lg mb-2 text-bahola-neutral-800 hover:text-bahola-blue-600">{title}</h3>
          </Link>
          <p className="text-sm text-bahola-neutral-600 line-clamp-2">{description}</p>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-bahola-blue-600">₹{price}</span>
            <Button size="sm" className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2">
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
