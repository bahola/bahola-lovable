
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

          {/* Hero Section - matching diseases-conditions page style */}
          <section className="bg-gradient-to-r from-bahola-blue-600 to-bahola-blue-800 text-white py-12 px-4 mb-8">
            <div className="container mx-auto">
              <div className="max-w-4xl">
                <div className="text-6xl mb-6">🤧</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Allergies
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-white opacity-90">
                  Natural homeopathic solutions for various types of allergies and sensitivities
                </p>
                
                <div className="space-y-8">
                  <Button asChild variant="secondary" className="bg-white text-bahola-blue-700 hover:bg-gray-100">
                    <Link to="/consultation">
                      Book a Consultation
                    </Link>
                  </Button>

                  {/* Sub-diseases buttons */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Browse Specific Allergies:</h3>
                    <div className="flex flex-wrap gap-3 max-w-4xl">
                      {allergysConcerns.map((concern) => (
                        <Button
                          key={concern.id}
                          asChild
                          variant="outline"
                          className="border-white/30 text-bahola-blue-800 bg-white/90 hover:bg-bahola-blue-600 hover:text-white hover:border-white/50 rounded-full px-4 py-2 text-sm"
                        >
                          <Link to={`/diseases-conditions/allergies/${concern.id}`}>
                            {concern.icon} {concern.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
