
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

          {/* Hero Section - set to 300px height */}
          <section className="bg-gradient-to-r from-bahola-blue-600 to-bahola-blue-800 text-white px-4 mb-8 h-[300px] flex items-center">
            <div className="container mx-auto">
              <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Column - Main Content */}
                <div>
                  <div className="text-3xl mb-3">🤧</div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                    Allergies
                  </h1>
                  <p className="text-base md:text-lg mb-4 text-white opacity-90">
                    Natural homeopathic solutions for various types of allergies and sensitivities
                  </p>
                  
                  <Button asChild variant="secondary" className="bg-white text-bahola-blue-700 hover:bg-gray-100">
                    <Link to="/consultation">
                      Book a Consultation
                    </Link>
                  </Button>
                </div>

                {/* Right Column - Browse Specific Allergies */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Browse Specific Allergies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {allergysConcerns.slice(0, 6).map((concern) => (
                      <Button
                        key={concern.id}
                        asChild
                        variant="outline"
                        className="border-white/30 text-bahola-blue-800 bg-white/90 hover:bg-bahola-blue-600 hover:text-white hover:border-white/50 rounded-full px-3 py-1 text-xs"
                      >
                        <Link to={`/diseases-conditions/allergies/${concern.id}`}>
                          {concern.icon} {concern.name}
                        </Link>
                      </Button>
                    ))}
                    {allergysConcerns.length > 6 && (
                      <span className="text-xs text-white/80 self-center">
                        +{allergysConcerns.length - 6} more
                      </span>
                    )}
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
