
import React from 'react';

interface RelatedProductsProps {
  products?: any[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products = [] }) => {
  // Use passed products or fallback to mock data
  const displayProducts = products.length > 0 ? products.slice(0, 4) : [
    { id: 1, name: 'Related Product 1', price: 195 },
    { id: 2, name: 'Related Product 2', price: 195 },
    { id: 3, name: 'Related Product 3', price: 195 },
    { id: 4, name: 'Related Product 4', price: 195 }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <div key={product.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-bahola-blue-600 font-bold mt-2">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
