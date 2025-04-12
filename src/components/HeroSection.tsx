
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden w-full cloud-bg">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bahola-neutral-900 mb-6">
            Find Natural Healing with Homeopathy
          </h1>
          <p className="text-xl text-bahola-neutral-700 mb-8">
            Discover the perfect remedy for your health concerns at Bahola Labs
          </p>
          
          <div className="max-w-md mx-auto mb-10 relative">
            <input 
              type="text" 
              placeholder="Search for remedies..." 
              className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg border-none focus:ring-2 focus:ring-bahola-blue-400 focus:outline-none text-lg"
            />
            <Search size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-bahola px-4 py-2 rounded-full">
              Search
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Button className="px-8 py-6 rounded-lg btn-bahola text-lg font-medium">
              Find Your Remedy
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-lg text-lg font-medium border-2 border-bahola-blue-400 text-bahola-blue-500 hover:bg-bahola-blue-50">
              Shop by Concern
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
