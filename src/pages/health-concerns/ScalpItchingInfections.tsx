
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ScalpItchingInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'scalp-itching-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Scalp Itching and Infections
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Scalp itching and infections can be uncomfortable and embarrassing. Homeopathy provides 
            gentle, effective treatment for various scalp conditions without harsh chemicals.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Conditions:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Fungal infections</li>
                <li>• Bacterial infections</li>
                <li>• Seborrheic dermatitis</li>
                <li>• Eczema of scalp</li>
                <li>• Psoriasis</li>
                <li>• Contact dermatitis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sulphur:</strong> For itchy, burning scalp</li>
                <li>• <strong>Graphites:</strong> For oozing, crusty eruptions</li>
                <li>• <strong>Mezereum:</strong> For thick crusts with pus</li>
                <li>• <strong>Arsenicum Album:</strong> For burning, restless itching</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ScalpItchingInfections;
