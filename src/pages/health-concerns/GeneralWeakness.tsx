
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const GeneralWeakness = () => {
  const concern = healthConcernsData.find(c => c.id === 'general-weakness')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for General Weakness
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            General weakness and debility can affect all aspects of life. Homeopathy helps 
            restore vitality by addressing the underlying causes and strengthening the constitution.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Signs of Weakness:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Physical debility</li>
                <li>• Mental exhaustion</li>
                <li>• Easy fatigue</li>
                <li>• Lack of stamina</li>
                <li>• Poor muscle tone</li>
                <li>• Reduced resilience</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>China:</strong> For weakness with irritability</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For sluggish vitality</li>
                <li>• <strong>Arsenicum Album:</strong> For weakness with anxiety</li>
                <li>• <strong>Phosphoric Acid:</strong> For deep exhaustion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default GeneralWeakness;
