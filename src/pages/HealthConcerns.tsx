
import React, { useState } from 'react';
import { Filter, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HealthConcernCard } from '@/components/health-concerns/HealthConcernCard';
import { HealthConcernFilters } from '@/components/health-concerns/HealthConcernFilters';
import { healthConcernsData, categoryInfo } from '@/data/healthConcernsData';

const HealthConcerns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredConcerns = healthConcernsData.filter(concern => {
    const matchesSearch = concern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concern.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || concern.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedConcerns = [...filteredConcerns].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'popular':
        return b.searchVolume - a.searchVolume;
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  // Group concerns by category
  const concernsByCategory = Object.keys(categoryInfo).reduce((acc, categoryKey) => {
    const categoryConcerns = sortedConcerns.filter(concern => concern.category === categoryKey);
    if (categoryConcerns.length > 0) {
      acc[categoryKey] = categoryConcerns;
    }
    return acc;
  }, {} as Record<string, typeof sortedConcerns>);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Diseases & Homeopathic Solutions",
    "description": "Comprehensive guide to natural homeopathic treatments for various diseases and health conditions including anxiety, digestive issues, skin problems, and more.",
    "url": "https://bahola-labs.lovable.app/health-concerns",
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient"
    },
    "about": healthConcernsData.map(concern => ({
      "@type": "MedicalCondition",
      "name": concern.name,
      "description": concern.description
    }))
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Main Content */}
        <div className="bg-gray-50 px-4 py-8">
          <div className="container mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
              <span>Home</span> / <span className="text-gray-900">Diseases</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <HealthConcernFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </aside>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden"
                      >
                        <Filter size={18} className="mr-2" />
                        Filters
                      </Button>
                      <span className="text-gray-600">
                        {sortedConcerns.length} diseases found
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* View Mode Toggle */}
                      <div className="hidden md:flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                        >
                          <Grid3X3 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className={viewMode === 'list' ? 'bg-gray-100' : ''}
                        >
                          <List size={16} />
                        </Button>
                      </div>

                      {/* Sort Dropdown */}
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-bahola-blue-500"
                        >
                          <option value="popular">Most Popular</option>
                          <option value="alphabetical">A-Z</option>
                          <option value="newest">Newest</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results by Category */}
                {selectedCategory === 'all' ? (
                  // Show all categories
                  <div className="space-y-12">
                    {Object.entries(concernsByCategory).map(([categoryKey, concerns]) => (
                      <div key={categoryKey} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-bahola-navy-950 mb-2">
                            {categoryInfo[categoryKey as keyof typeof categoryInfo].name}
                          </h2>
                          <p className="text-bahola-neutral-600">
                            {categoryInfo[categoryKey as keyof typeof categoryInfo].description}
                          </p>
                        </div>
                        <div className={`grid gap-4 ${
                          viewMode === 'grid' 
                            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                            : 'grid-cols-1'
                        }`}>
                          {concerns.map((concern) => (
                            <HealthConcernCard
                              key={concern.id}
                              concern={concern}
                              viewMode={viewMode}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Show selected category only
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {sortedConcerns.map((concern) => (
                      <HealthConcernCard
                        key={concern.id}
                        concern={concern}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                )}

                {sortedConcerns.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No diseases found matching your criteria.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthConcerns;
