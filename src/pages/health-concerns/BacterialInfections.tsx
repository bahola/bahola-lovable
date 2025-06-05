
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const BacterialInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'bacterial-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Bacterial Infections
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy offers effective treatment for bacterial infections by strengthening the 
            body's natural defense mechanisms and promoting healing from within.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Conditions:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Boils and carbuncles</li>
                <li>• Abscesses and pus formation</li>
                <li>• Infected wounds</li>
                <li>• Cellulitis</li>
                <li>• Impetigo</li>
                <li>• Folliculitis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Hepar Sulph:</strong> For pus formation and abscesses</li>
                <li>• <strong>Silicea:</strong> For chronic infections and drainage</li>
                <li>• <strong>Mercurius:</strong> For infected ulcers</li>
                <li>• <strong>Arsenicum Album:</strong> For burning infections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default BacterialInfections;
