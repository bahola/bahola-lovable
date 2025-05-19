
import React from 'react';

interface Variation {
  id: string;
  potency: string;
  pack_size: string;
  price: number;
}

interface ProductVariationsProps {
  variations: Variation[];
}

const ProductVariations: React.FC<ProductVariationsProps> = ({ variations }) => {
  if (!variations || variations.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Available Variations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {variations.map((variation) => (
          <div 
            key={variation.id}
            className="border border-bahola-neutral-200 rounded p-2 text-center hover:bg-bahola-blue-50 cursor-pointer"
          >
            <div className="font-medium">{variation.potency}</div>
            <div className="text-sm">{variation.pack_size}</div>
            <div className="text-bahola-blue-600">₹{variation.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariations;
