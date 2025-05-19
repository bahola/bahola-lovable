
import React from 'react';

interface ProductSpecsProps {
  potency: string;
  brand: string;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ potency, brand }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bahola-blue-50 p-3 rounded-lg">
          <span className="block text-sm font-medium">Potency</span>
          <span className="block text-lg">{potency}</span>
        </div>
        <div className="bg-bahola-blue-50 p-3 rounded-lg">
          <span className="block text-sm font-medium">Brand</span>
          <span className="block text-lg">{brand}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecs;
