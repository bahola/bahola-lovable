
import React from 'react';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';

const HeartHealthCategoryPage = () => {
  const heartHealthConcerns = healthConcernsData.filter(concern => 
    concern.category === 'Heart Health'
  );

  const concernsByCategory = {
    'Heart Health': heartHealthConcerns
  };

  return (
    <>
      <SEO
        title="Heart Health - Natural Homeopathic Treatment"
        description="Discover natural homeopathic remedies for cardiovascular health, heart conditions, and circulatory problems."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            <HealthConcernsBreadcrumb 
              categoryName="Heart Health"
              categoryPath="/diseases-conditions/heart-health"
            />
          </div>

          <HealthConcernsCategoryView
            concernsByCategory={concernsByCategory}
            viewMode="grid"
            categoryKey="Heart Health"
            showAsHeroSection={true}
          />
        </main>
      </div>
    </>
  );
};

export default HeartHealthCategoryPage;
