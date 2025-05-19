
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, ShoppingCart } from 'lucide-react';

interface ProductActionsProps {
  handleAddToCart: () => void;
  isOutOfStock: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({ handleAddToCart, isOutOfStock }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Button 
        className="flex-1 bg-bahola-blue-500 hover:bg-bahola-blue-600" 
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
      </Button>
      <Button variant="outline" className="min-w-[48px]">
        <Heart className="h-5 w-5" />
      </Button>
      <Button variant="outline" className="min-w-[48px]">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProductActions;
