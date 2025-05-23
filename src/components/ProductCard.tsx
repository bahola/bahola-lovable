
import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductProps {
  product: {
    id: number | string; // Updated to accept both string and number types
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
  const { toast } = useToast();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent, productId: string | number, productName: string, productPrice: number, productImage: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current cart from localStorage or initialize an empty array
    const currentCart = JSON.parse(localStorage.getItem('bahola_cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = currentCart.find((item: any) => item.id === productId);
    
    if (existingItem) {
      // Increment quantity if product already in cart
      existingItem.quantity += 1;
    } else {
      // Add new product with quantity 1
      currentCart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('bahola_cart', JSON.stringify(currentCart));
    
    // Notify user
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`
    });
  };

  const handleAddToWishlist = async (e: React.MouseEvent, productId: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsAddingToWishlist(true);
      
      // Check if user is logged in
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      
      if (!user) {
        toast({
          title: "Please login",
          description: "You need to be logged in to add items to your wishlist.",
        });
        return;
      }
      
      // Check if product is already in wishlist
      const { data: existingItems } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId);
        
      if (existingItems && existingItems.length > 0) {
        toast({
          title: "Already in wishlist",
          description: "This product is already in your wishlist.",
        });
        return;
      }
      
      // Add item to wishlist
      const { error } = await supabase
        .from('wishlist')
        .insert({
          user_id: user.id,
          product_id: productId
        });
        
      if (error) throw error;
      
      toast({
        title: "Added to wishlist",
        description: "Product has been added to your wishlist."
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add product to wishlist.",
        variant: "destructive"
      });
    } finally {
      setIsAddingToWishlist(false);
    }
  };
  
  // Check which type of props we received
  if ('product' in props) {
    // Handle the original ProductProps format
    const { product } = props;
    const imageUrl = product.image && product.image !== '' ? product.image : '/placeholder.svg';
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-bahola-neutral-200 transition-all duration-300 hover:shadow-lg">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="w-full h-48 object-contain p-4 bg-bahola-neutral-50"
              onError={(e) => {
                console.log('Image failed to load:', imageUrl);
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <button 
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-bahola-blue-50 transition-colors"
              onClick={(e) => handleAddToWishlist(e, product.id)}
              disabled={isAddingToWishlist}
            >
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
            <Button 
              size="sm" 
              className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2"
              onClick={(e) => handleAddToCart(e, product.id, product.name, product.price, product.image)}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    // Handle the CategoryPage/SearchResults format
    const { title, description, price, imageSrc, discountPercentage, rating, reviewCount, url } = props;
    const imageUrl = imageSrc && imageSrc !== '' ? imageSrc : '/placeholder.svg';
    const productId = url.split('/').pop() || '';
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-bahola-neutral-200 transition-all duration-300 hover:shadow-lg">
        <Link to={url} className="block">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-contain p-4 bg-bahola-neutral-50"
              onError={(e) => {
                console.log('Image failed to load:', imageUrl);
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <button 
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-bahola-blue-50 transition-colors"
              onClick={(e) => handleAddToWishlist(e, productId)}
              disabled={isAddingToWishlist}
            >
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
            <Button 
              size="sm" 
              className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2"
              onClick={(e) => handleAddToCart(e, productId, title, price, imageSrc)}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
