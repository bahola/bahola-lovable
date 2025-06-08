
import React from 'react';
import { Link } from 'react-router-dom';
import { HealthConcernCard } from './HealthConcernCard';
import { categoryInfo } from '@/data/healthConcernsData';
import { Button } from '@/components/ui/button';

interface HealthConcern {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  image: string;
  searchVolume: number;
  commonRemedies: string[];
  keywords: string[];
  lastUpdated: string;
  trending?: boolean;
}

interface HealthConcernsCategoryViewProps {
  concernsByCategory: Record<string, HealthConcern[]>;
  viewMode: 'grid' | 'list';
  categoryKey?: string;
  showAsHeroSection?: boolean;
}

const categoryRoutes: Record<string, string> = {
  'Allergies': '/diseases-conditions/allergies',
  'Gut Health': '/diseases-conditions/gut-health',
  'Heart Health': '/diseases-conditions/heart-health',
  'Child Care': '/diseases-conditions/child-care',
  'Cancer': '/diseases-conditions/cancer-support',
  'Anxiety & Mental Health': '/diseases-conditions/mental-health',
  'Ear Nose Throat': '/diseases-conditions/ent-care',
  'Eye Care': '/diseases-conditions/eye-care',
  'Hair Care': '/diseases-conditions/hair-care',
  'Immune boosters': '/diseases-conditions/immune-boosters',
  'Infection': '/diseases-conditions/infection-care',
  'Lifestyle': '/diseases-conditions/lifestyle-care',
  'Mental health': '/diseases-conditions/mental-health',
  'Muscle & Joint Care': '/diseases-conditions/muscle-care',
  'Nutritive': '/diseases-conditions/nutritive-care',
  'Pain Care': '/diseases-conditions/pain-care',
  'Reproductive care': '/diseases-conditions/reproductive-care',
  'Respiratory Care': '/diseases-conditions/respiratory-care',
  'Skin Care': '/diseases-conditions/skin-care',
  'Specialty Care': '/diseases-conditions/specialty-care',
  'Tooth Care': '/diseases-conditions/tooth-care',
  'Urinary care': '/diseases-conditions/urology-care',
  'Womens Care': '/diseases-conditions/womens-health'
};

export const HealthConcernsCategoryView: React.FC<HealthConcernsCategoryViewProps> = ({
  concernsByCategory,
  viewMode,
  categoryKey,
  showAsHeroSection = false,
}) => {
  if (showAsHeroSection && categoryKey) {
    const concerns = concernsByCategory[categoryKey] || [];
    const categoryData = categoryInfo[categoryKey as keyof typeof categoryInfo];
    
    return (
      <>
        {/* Hero Section - 300px height */}
        <section className="bg-gradient-to-r from-bahola-blue-600 to-bahola-blue-800 text-white px-4 mb-8 h-[300px] flex items-center">
          <div className="container mx-auto">
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column - Main Content */}
              <div>
                <div className="text-3xl mb-3">{categoryData?.icon || '🏥'}</div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  {categoryData?.name || categoryKey}
                </h1>
                <p className="text-base md:text-lg mb-4 text-white opacity-90">
                  {categoryData?.description || `Natural homeopathic solutions for ${categoryKey.toLowerCase()}`}
                </p>
                
                <Button asChild variant="secondary" className="bg-white text-bahola-blue-700 hover:bg-gray-100">
                  <Link to="/consultation">
                    Book a Consultation
                  </Link>
                </Button>
              </div>

              {/* Right Column - Browse Specific Conditions */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Browse Specific Conditions:</h3>
                <div className="flex flex-wrap gap-2">
                  {concerns.slice(0, 6).map((concern) => (
                    <Button
                      key={concern.id}
                      asChild
                      variant="outline"
                      className="border-white/30 text-bahola-blue-800 bg-white/90 hover:bg-bahola-blue-600 hover:text-white hover:border-white/50 rounded-full px-3 py-1 text-xs"
                    >
                      <Link to={`${categoryRoutes[categoryKey]}/${concern.id}`}>
                        {concern.icon} {concern.name}
                      </Link>
                    </Button>
                  ))}
                  {concerns.length > 6 && (
                    <span className="text-xs text-white/80 self-center">
                      +{concerns.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="bg-gray-50 px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                    categoryPrefix={categoryRoutes[categoryKey]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-12">
      {Object.entries(concernsByCategory).map(([categoryKey, concerns]) => (
        <div key={categoryKey} className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-bahola-navy-950 mb-2">
                {categoryInfo[categoryKey as keyof typeof categoryInfo].name}
              </h2>
              <p className="text-bahola-neutral-600">
                {categoryInfo[categoryKey as keyof typeof categoryInfo].description}
              </p>
            </div>
            {categoryRoutes[categoryKey] && (
              <Link
                to={categoryRoutes[categoryKey]}
                className="text-bahola-blue-600 hover:text-bahola-blue-700 font-medium text-sm"
              >
                View All →
              </Link>
            )}
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
                categoryPrefix={categoryRoutes[categoryKey]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
