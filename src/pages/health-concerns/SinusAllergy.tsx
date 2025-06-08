
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SinusAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'sinus-allergy') || {
    id: 'sinus-allergy',
    name: 'Sinus Allergy',
    description: 'Natural homeopathic treatment for sinus allergies and chronic sinusitis',
    category: 'Allergies',
    icon: '👃',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 6800,
    commonRemedies: ['Kali Bichromicum', 'Pulsatilla', 'Arsenicum Album', 'Hepar Sulphuris'],
    keywords: ['sinus allergy', 'allergic sinusitis', 'chronic sinusitis'],
    lastUpdated: '2024-01-15',
    trending: true
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Comprehensive Sinus Allergy Care
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Sinus allergies cause inflammation and congestion in the sinus cavities, leading to chronic discomfort. 
            Homeopathic treatment addresses both acute symptoms and underlying sensitivity patterns.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Nasal congestion and blockage</li>
                <li>• Post-nasal drip</li>
                <li>• Facial pain and pressure</li>
                <li>• Headaches and sinus pain</li>
                <li>• Reduced sense of smell</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Effective Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Kali Bichromicum:</strong> For thick, stringy discharge</li>
                <li>• <strong>Pulsatilla:</strong> For yellow-green discharge</li>
                <li>• <strong>Arsenicum Album:</strong> For burning, watery discharge</li>
                <li>• <strong>Hepar Sulph:</strong> For infected, painful sinuses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SinusAllergy;
