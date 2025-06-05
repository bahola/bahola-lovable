
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SoreThroat = () => {
  const concern = healthConcernsData.find(c => c.id === 'sore-throat')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Gentle Relief for Sore Throat
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Sore throat is a common symptom that can result from various causes including viral infections, 
            bacterial infections, or irritation. Homeopathy offers safe, effective relief for all types.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Viral infections (cold, flu)</li>
                <li>• Bacterial infections (strep throat)</li>
                <li>• Allergies</li>
                <li>• Dry air or irritants</li>
                <li>• Voice strain</li>
                <li>• Acid reflux</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Belladonna:</strong> For sudden, intense pain</li>
                <li>• <strong>Mercurius Sol:</strong> For throat with bad breath</li>
                <li>• <strong>Apis Mellifica:</strong> For swollen, stinging throat</li>
                <li>• <strong>Lycopodium:</strong> For right-sided throat pain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SoreThroat;
