
import React from 'react';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';

const EyeCareCategoryPage = () => {
  const eyeCareConcerns = healthConcernsData.filter(concern => 
    concern.category === 'Eye Care'
  );

  const concernsByCategory = {
    'Eye Care': eyeCareConcerns
  };

  return (
    <>
      <SEO
        title="Eye Care - Natural Homeopathic Treatment"
        description="Discover natural homeopathic remedies for eye health problems, vision issues, and eye-related conditions."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            <HealthConcernsBreadcrumb 
              categoryName="Eye Care"
              categoryPath="/diseases-conditions/eye-care"
            />
          </div>

          <HealthConcernsCategoryView
            concernsByCategory={concernsByCategory}
            viewMode="grid"
            categoryKey="Eye Care"
            showAsHeroSection={true}
          />
        </main>
      </div>
    </>
  );
};

export default EyeCareCategoryPage;
