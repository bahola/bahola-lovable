
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Star } from 'lucide-react';

const Reviews: React.FC = () => {
  return (
    <PageLayout title="Customer Reviews" description="Read what our customers say about Bahola Labs products and services">
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
            <p className="text-lg text-bahola-neutral-700 mb-6">
              We're working on bringing you authentic customer reviews and testimonials.
            </p>
            
            <div className="bg-bahola-blue-50 p-6 rounded-lg">
              <p className="text-bahola-blue-700">
                In the meantime, feel free to contact us directly to hear about our customers' experiences with our homeopathic remedies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Reviews;
