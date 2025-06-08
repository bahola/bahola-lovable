
import React from 'react';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';

const ENTCareCategoryPage = () => {
  const entCareConcerns = healthConcernsData.filter(concern => 
    concern.category === 'Ear Nose Throat'
  );

  const concernsByCategory = {
    'Ear Nose Throat': entCareConcerns
  };

  return (
    <>
      <SEO
        title="ENT Care - Natural Homeopathic Treatment"
        description="Discover natural homeopathic remedies for ear, nose, and throat conditions including sinusitis, earaches, and throat infections."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4">
            <HealthConcernsBreadcrumb 
              categoryName="ENT Care"
              categoryPath="/diseases-conditions/ent-care"
            />
          </div>

          <HealthConcernsCategoryView
            concernsByCategory={concernsByCategory}
            viewMode="grid"
            categoryKey="Ear Nose Throat"
            showAsHeroSection={true}
          />
        </main>
      </div>
    </>
  );
};

export default ENTCareCategoryPage;
