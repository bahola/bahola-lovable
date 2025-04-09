
import React from 'react';
import { Button } from '@/components/ui/button';

export const HomeopathyHeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-bahola-blue-400/10 to-bahola-blue-500/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-bahola-neutral-900 mb-6">
            Imagine Yourself Free From Health Concerns
          </h1>
          <p className="text-xl md:text-2xl text-bahola-neutral-700 mb-8">
            Picture a life where you're energized, balanced, and in harmony—naturally.
          </p>
          <Button className="px-8 py-6 rounded-lg btn-bahola text-lg font-medium">
            Begin Your Healing Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
};
