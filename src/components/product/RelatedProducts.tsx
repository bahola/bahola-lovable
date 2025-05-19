
import React from 'react';

const RelatedProducts: React.FC = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-medium">Related Product {item}</h3>
              <p className="text-bahola-blue-600 font-bold mt-2">₹195</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
