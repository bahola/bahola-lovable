import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartAdapter';

interface ProductProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    rating: number;
    image: string;
    originalPrice?: number;
    discountPercentage?: number;
    slug?: string; // Support Swell slug for product URLs
  }
}

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  url: string;
  originalPrice?: number;
}

export const ProductCard: React.FC<ProductProps | ProductCardProps> = (props) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent, productId: string, productName: string, productPrice: number, productImage: string, originalPrice?: number, discountPercentage?: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      originalPrice,
      discountPercentage,
      image: productImage
    });
    
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`
    });
  };

  const handleAddToWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsAddingToWishlist(true);
      
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      
      if (!user) {
        toast({
          title: "Please login",
          description: "You need to be logged in to add items to your wishlist.",
        });
        return;
      }
      
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
  
  if ('product' in props) {
    const { product } = props;
    const imageUrl = product.image && product.image !== '' ? product.image : '/placeholder.svg';
    const productIdString = String(product.id);
    const discountPrice = product.originalPrice && product.discountPercentage 
      ? product.originalPrice * (1 - product.discountPercentage / 100)
      : product.price;
    const productUrl = `/product/${product.slug || product.id}`;
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-bahola-neutral-200 transition-all duration-300 hover:shadow-lg">
        <Link to={productUrl} className="block">
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
              onClick={(e) => handleAddToWishlist(e, productIdString)}
              disabled={isAddingToWishlist}
            >
              <Heart size={18} className="text-bahola-neutral-600 hover:text-bahola-blue-500" />
            </button>
            {product.discountPercentage && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              <Star size={16} className="fill-yellow-400" />
              <span className="text-sm ml-1 text-bahola-neutral-700">{product.rating}</span>
            </div>
          </div>
          
          <Link to={productUrl} className="block">
            <h3 className="font-medium text-lg mb-2 text-bahola-neutral-800 hover:text-bahola-blue-600">{product.name}</h3>
          </Link>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-bahola-blue-600">₹{Math.round(discountPrice)}</span>
              {product.originalPrice && product.discountPercentage && (
                <span className="text-sm text-bahola-neutral-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <Button 
              size="sm" 
              className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2"
              onClick={(e) => handleAddToCart(e, productIdString, product.name, discountPrice, product.image, product.originalPrice, product.discountPercentage)}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    const { title, description, price, imageSrc, discountPercentage, rating, reviewCount, url, originalPrice } = props;
    const imageUrl = imageSrc && imageSrc !== '' ? imageSrc : '/placeholder.svg';
    const productId = url.split('/').pop() || '';
    const discountPrice = originalPrice && discountPercentage 
      ? originalPrice * (1 - discountPercentage / 100)
      : price;
    
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
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
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
            <div className="flex flex-col">
              <span className="text-lg font-bold text-bahola-blue-600">₹{Math.round(discountPrice)}</span>
              {originalPrice && discountPercentage > 0 && (
                <span className="text-sm text-bahola-neutral-500 line-through">₹{originalPrice}</span>
              )}
            </div>
            <Button 
              size="sm" 
              className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white rounded-full p-2"
              onClick={(e) => handleAddToCart(e, productId, title, discountPrice, imageSrc, originalPrice, discountPercentage)}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
