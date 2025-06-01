
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Star } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const Reviews: React.FC = () => {
  const { pageData, loading } = usePageContent('reviews');

  return (
    <PageLayout title={pageData?.title || "Customer Reviews"} description={pageData?.meta_description || "Read what our customers say about Bahola Labs products and services"}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-bahola-navy-950">Customer Reviews</h1>
          
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={24} />
              ))}
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Coming Soon</h2>
            
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              </div>
            ) : (
              <div className="bg-bahola-blue-50 p-6 rounded-lg">
                <div className="whitespace-pre-wrap text-bahola-blue-700">
                  {pageData?.content || "We're working on bringing you authentic customer reviews and testimonials."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Reviews;
