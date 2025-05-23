
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    stock?: number;
  };
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, quantity }) => {
  const { toast } = useToast();
  const [isAddingToWishlist, setIsAddingToWishlist] = React.useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get current cart from localStorage or initialize an empty array
    const currentCart = JSON.parse(localStorage.getItem('bahola_cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product with specified quantity
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '/placeholder.svg',
        quantity: quantity
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('bahola_cart', JSON.stringify(currentCart));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });
  };

  const handleAddToWishlist = async () => {
    try {
      setIsAddingToWishlist(true);
      
      // Check if user is logged in
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      
      if (!user) {
        toast({
          title: "Please login",
          description: "You need to be logged in to add items to your wishlist."
        });
        return;
      }
      
      // Check if product is already in wishlist
      const { data: existingItems } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id);
        
      if (existingItems && existingItems.length > 0) {
        toast({
          title: "Already in wishlist",
          description: "This product is already in your wishlist."
        });
        return;
      }
      
      // Add to wishlist
      const { error } = await supabase
        .from('wishlist')
        .insert({
          user_id: user.id,
          product_id: product.id
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
        description: "Failed to add product to wishlist."
      });
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied",
          description: "Product link copied to clipboard"
        });
      });
    }
  };

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="flex flex-col gap-3 mt-6">
      <Button 
        size="lg" 
        className="w-full flex items-center gap-2" 
        disabled={isOutOfStock}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="h-5 w-5" />
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleAddToWishlist}
          disabled={isAddingToWishlist}
        >
          <Heart className="h-5 w-5" />
          Wishlist
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
