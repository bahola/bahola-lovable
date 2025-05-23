
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

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

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, reviewCount: initialReviewCount }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        
        const reviewsWithUserData = (reviewsData || []).map((review) => ({
          ...review,
          user_email: `User ${review.user_id.substring(0, 8)}`
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
  
  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive"
      });
      return;
    }
    
    if (comment.trim() === '') {
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
          comment
        })
        .select(`
          id,
          rating,
          comment,
          created_at,
          user_id
        `);
        
      if (error) {
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
        const newReviewWithUser: Review = {
          ...data[0],
          user_email: user.email || `User ${user.id.substring(0, 8)}`
        };
        
        setReviews([newReviewWithUser, ...reviews]);
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
        <ReviewForm onSubmit={handleSubmitReview} isSubmitting={isSubmitting} />
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="mb-2">Please log in to leave a review</p>
          <Button>Sign In</Button>
        </div>
      )}
      
      <ReviewsList reviews={reviews} isLoading={isLoading} />
    </div>
  );
};

export default ProductReviews;
