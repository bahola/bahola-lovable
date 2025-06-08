
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

      <div className="bg-gradient-to-br from-bahola-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🤧</div>
            <h1 className="text-4xl md:text-5xl font-bold text-bahola-navy-950 mb-4 font-helvetica">
              Allergies
            </h1>
            <p className="text-xl text-bahola-neutral-600 mb-6">
              Natural homeopathic solutions for various types of allergies and sensitivities
            </p>
            
            <Button asChild className="mb-8 bg-bahola-blue-600 hover:bg-bahola-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium">
              <Link to="/consultation">
                Book a Consultation
              </Link>
            </Button>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="bg-bahola-blue-100 text-bahola-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Seasonal Allergies
              </span>
              <span className="bg-bahola-blue-100 text-bahola-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Food Allergies
              </span>
              <span className="bg-bahola-blue-100 text-bahola-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Skin Allergies
              </span>
              <span className="bg-bahola-blue-100 text-bahola-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Dust Allergies
              </span>
            </div>
          </div>
        </div>
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
