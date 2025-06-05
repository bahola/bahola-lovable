
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PremenstrualSyndrome = () => {
  const concern = healthConcernsData.find(c => c.id === 'premenstrual-syndrome')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief from PMS
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Premenstrual Syndrome (PMS) affects many women with a variety of physical and emotional symptoms. 
            Homeopathy provides gentle, effective relief without side effects.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Mood swings and irritability</li>
                <li>• Breast tenderness</li>
                <li>• Bloating and water retention</li>
                <li>• Food cravings</li>
                <li>• Fatigue and low energy</li>
                <li>• Menstrual cramps</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For irritability and mood swings</li>
                <li>• <strong>Pulsatilla:</strong> For changeable emotions</li>
                <li>• <strong>Natrum Muriaticum:</strong> For emotional sensitivity</li>
                <li>• <strong>Lycopodium:</strong> For bloating and digestive issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PremenstrualSyndrome;
