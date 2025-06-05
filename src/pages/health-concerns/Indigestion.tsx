
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Indigestion = () => {
  const concern = healthConcernsData.find(c => c.id === 'indigestion')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Indigestion
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Indigestion (dyspepsia) causes discomfort in the upper abdomen and can significantly 
            impact quality of life. Homeopathy provides gentle, effective relief for poor digestion.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Upper abdominal pain</li>
                <li>• Feeling of fullness</li>
                <li>• Nausea and vomiting</li>
                <li>• Belching and gas</li>
                <li>• Loss of appetite</li>
                <li>• Stomach burning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Nux Vomica:</strong> For indigestion from overeating</li>
                <li>• <strong>Pulsatilla:</strong> For rich, fatty food indigestion</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For weak digestion</li>
                <li>• <strong>Bryonia:</strong> For stomach pain worse from motion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Indigestion;
