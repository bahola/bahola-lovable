
import React from 'react';

interface ProductSpecsProps {
  potency: string;
  brand: string;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ potency }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-bahola-blue-50 p-3 rounded-lg">
          <span className="block text-sm font-medium">Potency</span>
          <span className="block text-lg">{potency}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecs;
