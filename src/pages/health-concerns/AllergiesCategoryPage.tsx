
import React from 'react';
import { Link } from 'react-router-dom';
import { HealthConcernsCategoryView } from '@/components/health-concerns/HealthConcernsCategoryView';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { healthConcernsData } from '@/data/healthConcernsData';
import { SEO } from '@/components/SEO';
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
    <>
      <SEO
        title="Allergies - Natural Homeopathic Treatment"
        description="Discover natural homeopathic remedies for various types of allergies including seasonal allergies, food allergies, skin allergies and more."
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
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
        </main>
      </div>
    </>
  );
};

export default AllergiesCategoryPage;
