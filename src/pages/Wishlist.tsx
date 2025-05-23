
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login', { state: { from: '/wishlist', message: 'Please login to view your wishlist' } });
        return;
      }
      setUser(session.user);
    };
    
    checkUser();
  }, [navigate]);

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('wishlist')
          .select(`
            *,
            products(
              id, name, price, image, type,
              product_variations(*)
            )
          `)
          .eq('user_id', user.id);
          
        if (error) {
          throw error;
        }
        
        console.log('Fetched wishlist data:', data);
        setWishlistItems(data || []);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast({
          title: "Failed to load wishlist",
          description: "There was an error loading your wishlist items.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchWishlist();
    }
  }, [user, toast]);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
        
      if (error) throw error;
      
      // Update the local state
      setWishlistItems(wishlistItems.filter(item => item.product_id !== productId));
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your wishlist.",
      });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove the item from your wishlist.",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = (product: any) => {
    // Get current cart from localStorage or initialize an empty array
    const currentCart = JSON.parse(localStorage.getItem('bahola_cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = currentCart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      // Increment quantity if product already in cart
      existingItem.quantity += 1;
    } else {
      // Add new product with quantity 1
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('bahola_cart', JSON.stringify(currentCart));
    
    // Notify user
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/4 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => {
            const product = item.products;
            return (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image || '/placeholder.svg'} 
                    alt={product.name} 
                    className="w-full h-48 object-contain p-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-bahola-blue-600 font-bold mb-4">₹{product.price}</p>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="default" 
                      className="flex items-center gap-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-500"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
