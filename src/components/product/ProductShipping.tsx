
import React from 'react';
import { TruckIcon } from 'lucide-react';

interface ProductShippingProps {
  shippingInfo: string;
}

const ProductShipping: React.FC<ProductShippingProps> = ({ shippingInfo }) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex items-start mb-4">
        <TruckIcon className="h-5 w-5 text-bahola-blue-500 mr-3 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Shipping Information</h3>
          <p className="text-sm text-bahola-neutral-600">{shippingInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductShipping;
