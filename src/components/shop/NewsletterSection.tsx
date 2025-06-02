
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Gift } from 'lucide-react';
import { toast } from 'sonner';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate newsletter signup
    setTimeout(() => {
      toast.success('Welcome! You\'ve been subscribed to our newsletter.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-bahola-blue-600 to-bahola-navy-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 rounded-full p-4">
              <Mail size={32} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Health Tips & Offers
          </h2>
          
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter and get exclusive health tips, product updates, and special discounts delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-bahola-navy-950 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-bahola-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>

          <div className="flex justify-center items-center gap-4 text-blue-100">
            <Gift size={20} />
            <span className="text-sm">
              Get 10% off your first order when you subscribe!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
