
import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';

export const SearchActionBar = () => {
  const { searchQuery, setSearchQuery, handleSearch, clearSearch } = useSearch();
  
  return (
    <div className="bg-white py-8 border-b border-bahola-neutral-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-md lg:max-w-lg relative">
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
            <div className="flex justify-start">
              <Link 
                to="/diseases-conditions" 
                className="bg-bahola-blue-600 hover:bg-bahola-blue-700 text-white font-medium font-helvetica rounded-full transition-colors duration-200 text-base px-12 py-3 inline-block whitespace-nowrap"
                style={{ 
                  minWidth: 'fit-content',
                  display: 'inline-block'
                }}
              >
                Health Issues
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
