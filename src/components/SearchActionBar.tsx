
import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';
import { healthConcernsData } from '@/data/healthConcernsData';

export const SearchActionBar = () => {
  const { searchQuery, setSearchQuery, handleSearch, clearSearch } = useSearch();
  const [showConcernDropdown, setShowConcernDropdown] = useState(false);
  
  // Get unique categories from health concerns data
  const categories = [...new Set(healthConcernsData.map(concern => concern.category))];
  const featuredConcerns = healthConcernsData.filter(concern => concern.trending).slice(0, 6);
  
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
              
              {/* Shop by Concern with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowConcernDropdown(true)}
                onMouseLeave={() => setShowConcernDropdown(false)}
              >
                <Button 
                  asChild 
                  variant="outline" 
                  className="px-6 py-3 text-base font-medium border-2 border-bahola-blue-500 text-bahola-blue-500 hover:bg-bahola-blue-50 font-helvetica whitespace-nowrap"
                >
                  <Link to="/health-concerns" className="flex items-center gap-2">
                    Shop by Concern
                    <ChevronDown size={16} />
                  </Link>
                </Button>
                
                {/* Dropdown Menu */}
                {showConcernDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6">
                    {/* Categories Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-bahola-navy-950 mb-3">Browse by Category</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Link 
                            key={category} 
                            to={`/health-concerns`} 
                            state={{ category }}
                            className="px-3 py-1 bg-bahola-blue-50 text-bahola-blue-600 rounded-full text-sm hover:bg-bahola-blue-100 transition-colors"
                          >
                            {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* Featured Concerns */}
                    <div>
                      <h3 className="text-lg font-semibold text-bahola-navy-950 mb-3">Trending Concerns</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {featuredConcerns.map((concern) => (
                          <Link 
                            key={concern.id}
                            to={`/health-concerns/${concern.id}`}
                            className="p-3 rounded-lg border border-gray-100 hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors group"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{concern.icon}</span>
                              <span className="font-medium text-sm text-bahola-navy-950 group-hover:text-bahola-blue-700">
                                {concern.name}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {concern.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    {/* View All Link */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        to="/health-concerns"
                        className="text-bahola-blue-600 hover:text-bahola-blue-700 font-medium text-sm"
                      >
                        View All Health Concerns →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
