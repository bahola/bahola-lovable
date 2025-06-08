
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const MoldAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'mold-allergy') || {
    id: 'mold-allergy',
    name: 'Mold Allergy',
    description: 'Homeopathic treatment for mold allergies and fungal sensitivity reactions',
    category: 'Allergies',
    icon: '🍄',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 3600,
    commonRemedies: ['Arsenicum Album', 'Lycopodium', 'Sulphur', 'Natrum Sulphuricum'],
    keywords: ['mold allergy', 'fungal sensitivity', 'mold spores'],
    lastUpdated: '2024-01-15',
    trending: false
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Mold Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Mold allergies are triggered by airborne mold spores found in damp environments. 
            Homeopathic remedies help strengthen the immune system and reduce hypersensitivity reactions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Locations:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Bathrooms and basements</li>
                <li>• Kitchen areas with moisture</li>
                <li>• Outdoor compost and leaves</li>
                <li>• Air conditioning systems</li>
                <li>• Old buildings with dampness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For respiratory symptoms</li>
                <li>• <strong>Lycopodium:</strong> For digestive sensitivity</li>
                <li>• <strong>Sulphur:</strong> For skin reactions to mold</li>
                <li>• <strong>Natrum Sulph:</strong> For damp weather sensitivity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default MoldAllergy;
