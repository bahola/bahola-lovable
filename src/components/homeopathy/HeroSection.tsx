
import React from 'react';
import { Button } from '@/components/ui/button';

export const HomeopathyHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-bahola-blue-400/10 to-bahola-blue-500/10 py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Peaceful natural landscape" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bahola-blue-900/60 to-bahola-navy-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Imagine Yourself Free From Health Concerns
          </h1>
          <p className="text-xl md:text-2xl text-bahola-blue-50 mb-8 drop-shadow-md">
            Picture a life where you're energized, balanced, and in harmony—naturally.
          </p>
          <Button className="px-8 py-6 rounded-lg btn-bahola text-lg font-medium shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Begin Your Healing Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
};
