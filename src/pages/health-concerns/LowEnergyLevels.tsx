
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LowEnergyLevels = () => {
  const concern = healthConcernsData.find(c => c.id === 'low-energy-levels')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Energy Enhancement
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Persistent low energy affects quality of life and productivity. Homeopathy addresses 
            the root causes of fatigue and helps restore natural vitality and vigor.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Constant tiredness</li>
                <li>• Lack of motivation</li>
                <li>• Physical weakness</li>
                <li>• Mental exhaustion</li>
                <li>• Poor concentration</li>
                <li>• Need for frequent rest</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For anxiety with weakness</li>
                <li>• <strong>Phosphoric Acid:</strong> For mental and physical exhaustion</li>
                <li>• <strong>China:</strong> For weakness after fluid loss</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For sluggish circulation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LowEnergyLevels;
