
import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StarRating from './StarRating';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_email?: string;
}

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {review.user_email ? review.user_email.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{review.user_email || 'Anonymous User'}</p>
            <p className="text-sm text-bahola-neutral-500">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex justify-end mb-1">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-bahola-neutral-700">{review.comment}</p>
      </div>
      
      <div className="flex gap-4">
        <button className="text-sm flex items-center gap-1 text-bahola-neutral-600 hover:text-bahola-blue-600">
          <ThumbsUp size={14} />
          <span>Helpful</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
