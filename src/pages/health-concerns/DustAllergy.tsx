
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const DustAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'dust-allergy') || {
    id: 'dust-allergy',
    name: 'Dust Allergy',
    description: 'Natural homeopathic treatment for dust allergies and related symptoms',
    category: 'Allergies',
    icon: '🌪️',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 5200,
    commonRemedies: ['Arsenicum Album', 'Natrum Muriaticum', 'Allium Cepa', 'Sabadilla'],
    keywords: ['dust allergy', 'dust mites', 'allergic reaction'],
    lastUpdated: '2024-01-15',
    trending: false
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Dust Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Dust allergies are caused by tiny bugs that live in household dust, called dust mites. 
            Homeopathic treatment helps reduce sensitivity and strengthen the immune system naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Triggers:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Dust mites in bedding</li>
                <li>• Old upholstery and carpets</li>
                <li>• Pet dander mixed with dust</li>
                <li>• Pollen accumulated indoors</li>
                <li>• Mold spores in dust</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For burning nasal discharge</li>
                <li>• <strong>Natrum Mur:</strong> For clear, watery discharge</li>
                <li>• <strong>Allium Cepa:</strong> For streaming eyes and nose</li>
                <li>• <strong>Sabadilla:</strong> For violent sneezing fits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default DustAllergy;
