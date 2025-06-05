
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HealthConcernsHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const HealthConcernsHero: React.FC<HealthConcernsHeroProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <section className="bg-gradient-to-r from-bahola-blue-600 to-bahola-blue-800 text-white py-12 px-4 mb-8">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diseases & Homeopathic Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-100">
            Discover natural remedies for diseases with our comprehensive guide to homeopathic treatments
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search diseases..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-4 pr-4 py-3 text-gray-900 rounded-lg"
              />
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              Find Remedies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
