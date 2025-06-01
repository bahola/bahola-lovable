
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const WeightManagement = () => {
  const concern = healthConcernsData.find(c => c.id === 'weight-management')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Weight Management
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy supports healthy weight management by addressing underlying metabolic 
            imbalances and promoting natural appetite regulation.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Areas of Support:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Metabolic enhancement</li>
                <li>• Appetite regulation</li>
                <li>• Emotional eating</li>
                <li>• Thyroid support</li>
                <li>• Digestive optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Calc Carb:</strong> For slow metabolism</li>
                <li>• <strong>Lycopodium:</strong> For digestive issues</li>
                <li>• <strong>Nat Mur:</strong> For water retention</li>
                <li>• <strong>Thyroidinum:</strong> For thyroid support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default WeightManagement;
