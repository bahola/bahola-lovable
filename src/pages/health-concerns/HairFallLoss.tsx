
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const HairFallLoss = () => {
  const concern = healthConcernsData.find(c => c.id === 'hair-fall-loss')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Hair Fall and Hair Loss
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Hair fall and hair loss can be distressing and affect self-confidence. Homeopathy 
            addresses the root causes of hair loss, promoting healthy hair growth naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Hormonal imbalances</li>
                <li>• Stress and anxiety</li>
                <li>• Nutritional deficiencies</li>
                <li>• Genetic factors</li>
                <li>• Scalp infections</li>
                <li>• Medical conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arnica Montana:</strong> For hair loss after trauma</li>
                <li>• <strong>Lycopodium:</strong> For premature baldness</li>
                <li>• <strong>Phosphorus:</strong> For patchy hair loss</li>
                <li>• <strong>Silicea:</strong> For strengthening hair</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default HairFallLoss;
