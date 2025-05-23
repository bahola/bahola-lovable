
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={setRating ? 24 : 16}
          className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} ${setRating ? "cursor-pointer" : ""}`}
          onClick={setRating ? () => setRating(star) : undefined}
        />
      ))}
    </div>
  );
};

export default StarRating;
