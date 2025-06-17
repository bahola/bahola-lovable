
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CallToActionSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
          alt="Serene sky" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bahola-blue-600/70 to-bahola-blue-400/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Journey to Freedom Starts Here</h2>
          <p className="text-xl mb-10">Take the first step toward reclaiming your health and vitality today.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="px-8 py-3 bg-white text-bahola-blue-600 hover:bg-gray-100 text-lg font-semibold rounded-full" asChild>
              <Link to="/register?type=customer">Create Customer Account</Link>
            </Button>
            <Button className="px-8 py-3 bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white text-lg font-semibold rounded-full border-2 border-white" asChild>
              <Link to="/register?type=doctor">Create Professional Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
