
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HealthConcernsHero } from '@/components/health-concerns/HealthConcernsHero';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { HealthConcernsToolbar } from '@/components/health-concerns/HealthConcernsToolbar';
import { HealthConcernFilters } from '@/components/health-concerns/HealthConcernFilters';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsGrid } from '@/components/health-concerns/HealthConcernsGrid';
import { NoResultsMessage } from '@/components/health-concerns/NoResultsMessage';
import { healthConcernsData, categoryInfo } from '@/data/healthConcernsData';

const HealthConcerns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Category route mapping
  const categoryRoutes: Record<string, string> = {
    'Allergy Care': '/health-concerns/allergy-care',
    'Gut Health': '/health-concerns/gut-health',
    'Heart Health': '/health-concerns/heart-health',
    'Child Care': '/health-concerns/child-care',
    'Cancer': '/health-concerns/cancer-support',
  };

  // Handle category change - navigate to specific category page
  const handleCategoryChange = (category: string) => {
    if (category !== 'all' && categoryRoutes[category]) {
      navigate(categoryRoutes[category]);
    } else {
      setSelectedCategory(category);
    }
  };

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

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
        <HealthConcernsHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="bg-gray-50 px-4 py-8">
          <div className="container mx-auto">
            <HealthConcernsBreadcrumb />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <HealthConcernFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </aside>

              {/* Main Content Area */}
              <div className="flex-1">
                <HealthConcernsToolbar
                  showFilters={showFilters}
                  onToggleFilters={() => setShowFilters(!showFilters)}
                  concernsCount={sortedConcerns.length}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                {/* Results by Category */}
                {selectedCategory === 'all' ? (
                  <HealthConcernsCategoryView
                    concernsByCategory={concernsByCategory}
                    viewMode={viewMode}
                  />
                ) : (
                  <HealthConcernsGrid
                    concerns={sortedConcerns}
                    viewMode={viewMode}
                  />
                )}

                {sortedConcerns.length === 0 && (
                  <NoResultsMessage onClearFilters={handleClearFilters} />
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
