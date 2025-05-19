
import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  stock: number;
  setQuantity: (quantity: number) => void;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({ quantity, stock, setQuantity }) => {
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="font-semibold mb-2">Quantity</h2>
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={decreaseQuantity} 
          disabled={quantity <= 1}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        <span className="mx-4 text-lg font-medium w-8 text-center">{quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={increaseQuantity}
          disabled={quantity >= stock}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantity;
