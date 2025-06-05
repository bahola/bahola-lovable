
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const FeverWithChills = () => {
  const concern = healthConcernsData.find(c => c.id === 'fever-with-chills')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Fever with Chills
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy provides effective treatment for fever with chills by addressing the 
            underlying cause and supporting the body's natural healing mechanisms.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Fever Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Sudden onset of high fever</li>
                <li>• Alternating chills and heat</li>
                <li>• Shivering and sweating</li>
                <li>• Body aches and weakness</li>
                <li>• Headache with fever</li>
                <li>• Restlessness during fever</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Aconitum:</strong> For sudden onset with restlessness</li>
                <li>• <strong>Belladonna:</strong> For high fever with throbbing</li>
                <li>• <strong>Bryonia:</strong> For fever with body aches</li>
                <li>• <strong>Gelsemium:</strong> For fever with weakness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default FeverWithChills;
