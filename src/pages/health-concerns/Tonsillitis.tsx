
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Tonsillitis = () => {
  const concern = healthConcernsData.find(c => c.id === 'tonsillitis')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Tonsillitis
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Tonsillitis is inflammation of the tonsils, often caused by viral or bacterial infections. 
            Homeopathy provides gentle, effective treatment to reduce inflammation and support recovery.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Tonsillitis Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Sore, swollen throat</li>
                <li>• Difficulty swallowing</li>
                <li>• Red, inflamed tonsils</li>
                <li>• White or yellow coating on tonsils</li>
                <li>• Fever and chills</li>
                <li>• Ear pain</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Belladonna:</strong> For sudden onset with fever</li>
                <li>• <strong>Mercurius Sol:</strong> For infected tonsils</li>
                <li>• <strong>Hepar Sulph:</strong> For pus formation</li>
                <li>• <strong>Phytolacca:</strong> For chronic tonsillitis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Tonsillitis;
