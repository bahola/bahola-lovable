
import React, { useState } from 'react';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { HealthConcernsToolbar } from '@/components/health-concerns/HealthConcernsToolbar';
import { HealthConcernsGrid } from '@/components/health-concerns/HealthConcernsGrid';
import { NoResultsMessage } from '@/components/health-concerns/NoResultsMessage';
import { healthConcernsData } from '@/data/healthConcernsData';

const SkinCare = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryName = 'Skin Care';
  const filteredConcerns = healthConcernsData.filter(concern => {
    const matchesCategory = concern.category === categoryName;
    const matchesSearch = concern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concern.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
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

  const handleClearFilters = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-bahola-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-bahola-navy-950 mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-bahola-neutral-600 max-w-3xl mx-auto">
              Natural homeopathic remedies for healthy, beautiful skin
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-8">
          <div className="container mx-auto">
            <HealthConcernsBreadcrumb 
              categoryName={categoryName}
              categoryPath="/health-concerns/skin-care"
            />

            <div className="flex-1">
              <HealthConcernsToolbar
                showFilters={false}
                onToggleFilters={() => {}}
                concernsCount={sortedConcerns.length}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              <HealthConcernsGrid
                concerns={sortedConcerns}
                viewMode={viewMode}
              />

              {sortedConcerns.length === 0 && (
                <NoResultsMessage onClearFilters={handleClearFilters} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkinCare;
