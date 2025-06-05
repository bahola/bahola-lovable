
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LossOfAppetiteCancer = () => {
  const concern = healthConcernsData.find(c => c.id === 'loss-of-appetite-cancer')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Restoring Appetite During Cancer Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Loss of appetite is common during cancer treatment. Homeopathy can help restore 
            natural hunger and improve nutritional intake for better healing and recovery.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Appetite Issues:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Complete loss of appetite</li>
                <li>• Food aversion</li>
                <li>• Nausea with food</li>
                <li>• Taste changes</li>
                <li>• Early satiety</li>
                <li>• Weight loss</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Lycopodium:</strong> For poor appetite</li>
                <li>• <strong>China:</strong> For weakness from poor eating</li>
                <li>• <strong>Pulsatilla:</strong> For food aversion</li>
                <li>• <strong>Ignatia:</strong> For emotional appetite loss</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LossOfAppetiteCancer;
