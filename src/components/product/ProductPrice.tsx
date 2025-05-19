
import React from 'react';

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, originalPrice, discountPercentage }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <span className="text-2xl font-bold">₹{price}</span>
        {originalPrice && (
          <>
            <span className="ml-3 text-bahola-neutral-500 line-through">₹{originalPrice}</span>
            {discountPercentage && (
              <span className="ml-3 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-sm">
                {discountPercentage}% OFF
              </span>
            )}
          </>
        )}
      </div>
      <p className="text-sm text-bahola-neutral-500 mt-1">Inclusive of all taxes</p>
    </div>
  );
};

export default ProductPrice;
