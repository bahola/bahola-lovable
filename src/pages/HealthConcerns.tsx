
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HealthConcernsHero } from '@/components/health-concerns/HealthConcernsHero';
import { HealthConcernFilters } from '@/components/health-concerns/HealthConcernFilters';
import { HealthConcernsToolbar } from '@/components/health-concerns/HealthConcernsToolbar';
import { HealthConcernsGrid } from '@/components/health-concerns/HealthConcernsGrid';
import { NoResultsMessage } from '@/components/health-concerns/NoResultsMessage';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';

const HealthConcerns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categories = Array.from(new Set(healthConcernsData.map(concern => concern.category)));

  // Filter concerns based on search query and selected categories
  const filteredConcerns = healthConcernsData.filter(concern => {
    const matchesSearch = concern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concern.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(concern.category);
    
    return matchesSearch && matchesCategory;
  });

  // Sort concerns
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
    setSelectedCategories([]);
  };

  const sidebarCategories = [
    { name: 'Gut Health', path: '/diseases-conditions/gut-health', icon: '🦠' },
    { name: 'Heart Health', path: '/diseases-conditions/heart-health', icon: '❤️' },
    { name: 'Child Care', path: '/diseases-conditions/child-care', icon: '👶' },
    { name: 'Cancer Support', path: '/diseases-conditions/cancer-support', icon: '🎗️' },
    { name: 'ENT Care', path: '/diseases-conditions/ent-care', icon: '👂' },
    { name: 'Eye Care', path: '/diseases-conditions/eye-care', icon: '👁️' },
    { name: 'Allergy Care', path: '/diseases-conditions/allergies', icon: '🤧' },
    { name: 'Hair Care', path: '/diseases-conditions/hair-care', icon: '💇' },
    { name: 'Immune Boosters', path: '/diseases-conditions/immune-boosters', icon: '🛡️' },
    { name: 'Infection Care', path: '/diseases-conditions/infection-care', icon: '🦠' },
    { name: 'Lifestyle Care', path: '/diseases-conditions/lifestyle-care', icon: '🧘' },
    { name: 'Mental Health', path: '/diseases-conditions/mental-health', icon: '🧠' },
    { name: 'Muscle Care', path: '/diseases-conditions/muscle-care', icon: '💪' },
    { name: 'Nutritive Care', path: '/diseases-conditions/nutritive-care', icon: '🥗' },
    { name: 'Pain Care', path: '/diseases-conditions/pain-care', icon: '⚡' },
    { name: 'Reproductive Care', path: '/diseases-conditions/reproductive-care', icon: '🌸' },
    { name: 'Respiratory Care', path: '/diseases-conditions/respiratory-care', icon: '🫁' },
    { name: 'Skin Care', path: '/diseases-conditions/skin-care', icon: '✨' },
    { name: 'Tooth Care', path: '/diseases-conditions/tooth-care', icon: '🦷' },
    { name: 'Urology Care', path: '/diseases-conditions/urology-care', icon: '💧' },
    { name: 'Women\'s Health', path: '/diseases-conditions/womens-health', icon: '👩' },
  ];

  return (
    <>
      <SEO
        title="Health Conditions & Diseases - Natural Homeopathic Treatment"
        description="Explore comprehensive information about various health conditions and diseases. Find natural homeopathic remedies and treatments for your health concerns."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <HealthConcernsHero />
          
          <div className="bg-gray-50 px-4 py-8">
            <div className="container mx-auto flex gap-8">
              {/* Sidebar */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-bahola-navy-950 mb-4">
                    Browse by Category
                  </h3>
                  <nav className="space-y-2">
                    {sidebarCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-bahola-blue-50 transition-colors group"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm text-bahola-neutral-700 group-hover:text-bahola-blue-600">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <HealthConcernsToolbar
                  showFilters={showFilters}
                  onToggleFilters={() => setShowFilters(!showFilters)}
                  concernsCount={sortedConcerns.length}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />

                {showFilters && (
                  <HealthConcernFilters
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoriesChange={setSelectedCategories}
                  />
                )}

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
    </>
  );
};

export default HealthConcerns;
