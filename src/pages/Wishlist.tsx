import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSwellWishlist, WishlistItem } from '@/hooks/useSwellWishlist';
import { useCart } from '@/contexts/CartAdapter';
import { useSwellAuth } from '@/contexts/SwellAuthContext';

const WishlistPage = () => {
  const { wishlistItems, isLoading, removeFromWishlist } = useSwellWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useSwellAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.product_id,
      name: item.product_name || 'Product',
      price: item.product_price || 0,
      image: item.product_image || '/placeholder.svg',
      taxStatus: 'taxable',
      taxClass: '5'
    }, 1);
    
    toast({
      title: "Added to cart",
      description: `${item.product_name} has been added to your cart.`
    });
  };

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  // Loading state
  if (isLoading) {
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

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Please log in to view your wishlist
          </p>
          <Button onClick={() => navigate('/login', { state: { from: '/my-list' } })}>
            Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/product/${item.product_id}`} className="block">
                <div className="relative aspect-square bg-gray-50">
                  <img 
                    src={item.product_image || '/placeholder.svg'} 
                    alt={item.product_name || 'Product'} 
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${item.product_id}`}>
                  <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors line-clamp-2">
                    {item.product_name || 'Product'}
                  </h3>
                </Link>
                <p className="text-primary font-bold mb-4">
                  ₹{(item.product_price || 0).toFixed(2)}
                </p>
                
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="default" 
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemove(item.product_id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
