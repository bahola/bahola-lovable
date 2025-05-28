
import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';

export const HeroSection = () => {
  const { searchQuery, setSearchQuery, handleSearch, clearSearch } = useSearch();
  
  return (
    <div className="relative overflow-hidden cloud-bg">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bahola-navy-950 mb-6 font-helvetica" style={{ letterSpacing: '-0.02em' }}>
            Find Natural Healing with Homeopathy
          </h1>
          <p className="text-xl text-bahola-neutral-700 mb-8 font-serif">
            Discover the perfect remedy for your health concerns at Bahola Labs
          </p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10 relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for remedies..." 
                className="w-full pl-12 pr-24 py-4 rounded-full shadow-lg border-none focus:ring-2 focus:ring-bahola-blue-500 focus:outline-none text-lg font-helvetica"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
              
              {searchQuery && (
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={clearSearch}
                >
                  <X size={18} />
                </Button>
              )}
              
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-bahola font-helvetica"
              >
                Search
              </button>
            </div>
          </form>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Button className="px-8 py-6 rounded-lg btn-bahola text-lg font-medium font-helvetica">
              Find Your Remedy
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-lg text-lg font-medium border-2 border-bahola-blue-500 text-bahola-blue-500 hover:bg-bahola-blue-50 font-helvetica">
              Shop by Concern
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
