
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, MessageCircle, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

// Updated interface to handle possible missing user info
interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_email?: string;
}

interface ProductReviewsProps {
  productId: string;
  reviewCount: number;
}

const StarRating = ({ rating, setRating = undefined }: { rating: number; setRating?: (rating: number) => void }) => {
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

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, reviewCount: initialReviewCount }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        // First, fetch the reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('product_reviews')
          .select(`
            id,
            rating,
            comment,
            created_at,
            user_id
          `)
          .eq('product_id', productId)
          .order('created_at', { ascending: false });
          
        if (reviewsError) {
          throw reviewsError;
        }
        
        // Next, get user emails for each review if available
        const reviewsWithUserData = await Promise.all((reviewsData || []).map(async (review) => {
          if (!review.user_id) return { ...review, user_email: 'Unknown User' };
          
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', review.user_id)
            .single();
          
          // If we can't get the user email, use the first part of the ID as a placeholder
          const userEmail = userError ? 
            `User ${review.user_id.substring(0, 6)}` : 
            (userData?.email || `User ${review.user_id.substring(0, 6)}`);
          
          return {
            ...review,
            user_email: userEmail
          };
        }));
        
        setReviews(reviewsWithUserData || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Failed to load reviews",
          description: "There was an error loading the product reviews.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    fetchReviews();
  }, [productId, toast]);
  
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive"
      });
      return;
    }
    
    if (newReview.trim() === '') {
      toast({
        title: "Review required",
        description: "Please enter a review comment.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating,
          comment: newReview
        })
        .select(`
          id,
          rating,
          comment,
          created_at,
          user_id
        `);
        
      if (error) {
        // Check if error is due to unique constraint violation
        if (error.code === '23505') {
          toast({
            title: "Already reviewed",
            description: "You have already reviewed this product.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else if (data) {
        // Add user email to the new review
        const newReviewWithUser: Review = {
          ...data[0],
          user_email: user.email || `User ${user.id.substring(0, 6)}`
        };
        
        setReviews([newReviewWithUser, ...reviews]);
        setNewReview('');
        setRating(5);
        toast({
          title: "Review submitted",
          description: "Your review has been successfully submitted.",
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your review.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>
      
      {user ? (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
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
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="mb-2">Please log in to leave a review</p>
          <Button>Sign In</Button>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading reviews...</p>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
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
          ))}
        </div>
      ) : (
        <p className="text-bahola-neutral-700">No reviews yet. Be the first to review this product!</p>
      )}
    </div>
  );
};

export default ProductReviews;
