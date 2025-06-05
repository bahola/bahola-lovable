
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LossOfVoiceLaryngitis = () => {
  const concern = healthConcernsData.find(c => c.id === 'loss-of-voice')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Restoring Voice with Natural Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Loss of voice (laryngitis) can result from infection, overuse, or irritation of the vocal cords. 
            Homeopathy helps restore voice naturally and strengthens the larynx.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Viral or bacterial infections</li>
                <li>• Voice overuse or strain</li>
                <li>• Acid reflux</li>
                <li>• Allergies</li>
                <li>• Smoking or irritants</li>
                <li>• Throat trauma</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Argentum Nitricum:</strong> For singers and speakers</li>
                <li>• <strong>Causticum:</strong> For hoarseness with paralysis</li>
                <li>• <strong>Phosphorus:</strong> For painful laryngitis</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For voice fatigue</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LossOfVoiceLaryngitis;
