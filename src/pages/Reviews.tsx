import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Reviews = () => {
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      customer: {
        name: 'Rajesh Kumar',
        avatar: '',
        location: 'Chennai'
      },
      product: 'Arnica Montana 30C',
      rating: 5,
      date: '15 March 2025',
      comment: 'Excellent remedy for bruises and muscle pain. I\'ve been using it for years and it never disappoints. The quality from Bahola Labs is consistently good.',
      likes: 24,
      replies: 2
    },
    {
      id: 2,
      customer: {
        name: 'Priya Sharma',
        avatar: '',
        location: 'Bangalore'
      },
      product: 'Bach Flower Rescue Remedy',
      rating: 5,
      date: '2 April 2025',
      comment: 'This is a lifesaver for stressful situations! I keep it in my bag at all times. Fast delivery and authentic product.',
      likes: 18,
      replies: 1
    },
    {
      id: 3,
      customer: {
        name: 'Anand Patel',
        avatar: '',
        location: 'Mumbai'
      },
      product: 'Belladonna 200C',
      rating: 4,
      date: '28 March 2025',
      comment: 'Works well for fever and inflammation. I appreciate the secure packaging and the promptness of delivery. Would recommend.',
      likes: 12,
      replies: 0
    },
    {
      id: 4,
      customer: {
        name: 'Lakshmi Rao',
        avatar: '',
        location: 'Hyderabad'
      },
      product: 'Nux Vomica 30C',
      rating: 5,
      date: '10 April 2025',
      comment: 'Great for digestive issues! This has helped me manage acid reflux better than anything else I\'ve tried. Very satisfied with the purchase.',
      likes: 32,
      replies: 3
    }
  ];

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <PageLayout title="Customer Reviews" description="What our customers are saying about our products">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="text-3xl font-bold text-bahola-neutral-900 mb-2">4.8</h3>
              <div className="flex justify-center mb-2">
                <StarRating rating={5} />
              </div>
              <p className="text-bahola-neutral-600">Based on 1,245 reviews</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="text-3xl font-bold text-bahola-neutral-900 mb-2">92%</h3>
              <p className="text-green-600 font-medium mb-2">Recommend</p>
              <p className="text-bahola-neutral-600">Of customers recommend our products</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="text-3xl font-bold text-bahola-neutral-900 mb-2">4.9</h3>
              <div className="flex justify-center mb-2">
                <StarRating rating={5} />
              </div>
              <p className="text-bahola-neutral-600">Service quality rating</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="5star">5 Star</TabsTrigger>
            <TabsTrigger value="4star">4 Star</TabsTrigger>
            <TabsTrigger value="3star">3 Star & Below</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>
                  Read what our customers are saying about their purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.customer.avatar} />
                            <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.customer.name}</p>
                            <p className="text-sm text-bahola-neutral-500">{review.customer.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex justify-end mb-1">
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="text-sm text-bahola-neutral-500">{review.date}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-bahola-blue-600 mb-2">
                          Purchased: {review.product}
                        </p>
                        <p className="text-bahola-neutral-700">{review.comment}</p>
                      </div>
                      
                      <div className="flex gap-4">
                        <button className="text-sm flex items-center gap-1 text-bahola-neutral-600 hover:text-bahola-blue-600">
                          <ThumbsUp size={14} />
                          <span>Helpful ({review.likes})</span>
                        </button>
                        <button className="text-sm flex items-center gap-1 text-bahola-neutral-600 hover:text-bahola-blue-600">
                          <MessageCircle size={14} />
                          <span>Reply ({review.replies})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tab contents would be similar but filtered */}
          <TabsContent value="5star" className="mt-6">
            {/* 5-star reviews */}
          </TabsContent>
          <TabsContent value="4star" className="mt-6">
            {/* 4-star reviews */}
          </TabsContent>
          <TabsContent value="3star" className="mt-6">
            {/* 3-star and below reviews */}
          </TabsContent>
        </Tabs>
        
        <div className="bg-bahola-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Share Your Experience</h3>
          <p className="text-bahola-neutral-600 mb-4 max-w-2xl mx-auto">
            Have you purchased from Bahola Labs? We'd love to hear about your experience. 
            Your feedback helps us improve and assists other customers in making informed decisions.
          </p>
          <Button>Write a Review</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Reviews;
