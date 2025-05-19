
import React from 'react';
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  stock: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating, reviewCount, stock }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center mr-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-bahola-neutral-600">{rating} ({reviewCount} reviews)</span>
      </div>
      <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
        {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
      </span>
    </div>
  );
};

export default ProductRating;
