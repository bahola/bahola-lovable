
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SeasonalAllergies = () => {
  const concern = healthConcernsData.find(c => c.id === 'seasonal-allergies')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Seasonal Allergy Relief
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Seasonal allergies, also known as hay fever, can cause significant discomfort during 
            certain times of the year. Homeopathic remedies offer gentle, natural relief without drowsiness.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Sneezing and runny nose</li>
                <li>• Itchy, watery eyes</li>
                <li>• Nasal congestion</li>
                <li>• Postnasal drip</li>
                <li>• Throat irritation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Allium Cepa:</strong> For watery discharge</li>
                <li>• <strong>Sabadilla:</strong> For spasmodic sneezing</li>
                <li>• <strong>Euphrasia:</strong> For eye symptoms</li>
                <li>• <strong>Natrum Muriaticum:</strong> For chronic cases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SeasonalAllergies;
