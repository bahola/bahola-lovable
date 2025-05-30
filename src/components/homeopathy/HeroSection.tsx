
import React from 'react';
import { Button } from '@/components/ui/button';

export const HomeopathyHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-bahola-blue-400/10 to-bahola-blue-500/10 py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png"
          alt="Person with arms outstretched at mountain sunrise - freedom and wellness" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bahola-blue-900/30 to-bahola-navy-900/20"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            Imagine Yourself Free From Health Concerns
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
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
