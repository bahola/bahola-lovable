
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PetDanderAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'pet-dander-allergy') || {
    id: 'pet-dander-allergy',
    name: 'Pet Dander Allergy',
    description: 'Natural homeopathic solutions for pet dander allergies and related symptoms',
    category: 'Allergies',
    icon: '🐕',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 4200,
    commonRemedies: ['Arsenicum Album', 'Natrum Muriaticum', 'Allium Cepa', 'Euphrasia'],
    keywords: ['pet dander', 'animal allergies', 'cat allergies', 'dog allergies'],
    lastUpdated: '2024-01-15',
    trending: false
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Managing Pet Dander Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Pet dander allergies are reactions to proteins found in animal skin cells, saliva, and urine. 
            Homeopathic treatment helps reduce sensitivity while allowing you to coexist with beloved pets.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Sources:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Cat dander and saliva</li>
                <li>• Dog dander and saliva</li>
                <li>• Bird feathers and droppings</li>
                <li>• Rabbit and rodent fur</li>
                <li>• Horse hair and dander</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Effective Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For burning nasal symptoms</li>
                <li>• <strong>Natrum Mur:</strong> For clear, watery discharge</li>
                <li>• <strong>Allium Cepa:</strong> For streaming nose and eyes</li>
                <li>• <strong>Euphrasia:</strong> For irritated, watery eyes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PetDanderAllergy;
