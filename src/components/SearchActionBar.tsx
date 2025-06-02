
import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';

export const SearchActionBar = () => {
  const { searchQuery, setSearchQuery, handleSearch, clearSearch } = useSearch();
  
  return (
    <div className="bg-white py-8 border-b border-bahola-neutral-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md lg:max-w-lg relative">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for remedies..." 
                  className="w-full pl-12 pr-20 py-3 rounded-full shadow-md border border-bahola-neutral-200 focus:ring-2 focus:ring-bahola-blue-500 focus:outline-none text-base font-helvetica"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
                
                {searchQuery && (
                  <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                    onClick={clearSearch}
                  >
                    <X size={16} />
                  </Button>
                )}
                
                <button 
                  type="submit" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 btn-bahola px-4 py-2 text-sm font-helvetica"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="px-6 py-3 btn-bahola text-base font-medium font-helvetica whitespace-nowrap">
                <Link to="/products">Find Your Remedy</Link>
              </Button>
              <Button asChild variant="outline" className="px-6 py-3 text-base font-medium border-2 border-bahola-blue-500 text-bahola-blue-500 hover:bg-bahola-blue-50 font-helvetica whitespace-nowrap">
                <Link to="/health-concerns">Shop by Concern</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
