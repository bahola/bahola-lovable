
import React from 'react';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';

const GutHealthCategoryPage = () => {
  const gutHealthConcerns = healthConcernsData.filter(concern => 
    concern.category === 'Gut Health'
  );

  const concernsByCategory = {
    'Gut Health': gutHealthConcerns
  };

  return (
    <>
      <SEO
        title="Gut Health - Natural Homeopathic Treatment"
        description="Discover natural homeopathic remedies for digestive issues, gut health problems, and gastrointestinal conditions."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            <HealthConcernsBreadcrumb 
              categoryName="Gut Health"
              categoryPath="/diseases-conditions/gut-health"
            />
          </div>

          <HealthConcernsCategoryView
            concernsByCategory={concernsByCategory}
            viewMode="grid"
            categoryKey="Gut Health"
            showAsHeroSection={true}
          />
        </main>
      </div>
    </>
  );
};

export default GutHealthCategoryPage;
