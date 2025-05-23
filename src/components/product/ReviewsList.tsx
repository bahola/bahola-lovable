
import React from 'react';
import { Loader2 } from 'lucide-react';
import ReviewItem from './ReviewItem';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_email?: string;
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2 text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="text-bahola-neutral-700">No reviews yet. Be the first to review this product!</p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
