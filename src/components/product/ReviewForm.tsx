
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>;
  isSubmitting: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isSubmitting }) => {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(rating, newReview);
    setNewReview('');
    setRating(5);
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium mb-1">Your Review</label>
          <Textarea
            id="review"
            placeholder="Share your experience with this product..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full"
            rows={4}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
