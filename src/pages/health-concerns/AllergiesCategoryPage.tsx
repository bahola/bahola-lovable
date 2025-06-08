
import React from 'react';
import { Link } from 'react-router-dom';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';

const AllergiesCategoryPage = () => {
  // Filter health concerns to only show allergy-related ones
  const allergysConcerns = healthConcernsData.filter(concern => 
    concern.category === 'Allergies'
  );

  const concernsByCategory = {
    'Allergies': allergysConcerns
  };

  return (
    <PageLayout 
      title="Allergies - Natural Homeopathic Treatment" 
      description="Discover natural homeopathic remedies for various types of allergies including seasonal allergies, food allergies, skin allergies and more."
    >
      <div className="container mx-auto px-4">
        <HealthConcernsBreadcrumb 
          categoryName="Allergies"
          categoryPath="/diseases-conditions/allergies"
        />
      </div>

      <div className="bg-gray-50 px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <HealthConcernsCategoryView
            concernsByCategory={concernsByCategory}
            viewMode="grid"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default AllergiesCategoryPage;
