
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const EarSinusInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'ear-sinus-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief for Ear & Sinus Infections
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy provides gentle yet effective treatment for ear and sinus infections, 
            reducing pain and inflammation while supporting natural healing.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Conditions Treated:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Acute otitis media (ear infections)</li>
                <li>• Chronic sinusitis</li>
                <li>• Acute sinus infections</li>
                <li>• Ear pain and discharge</li>
                <li>• Blocked sinuses</li>
                <li>• Post-nasal drip infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Belladonna:</strong> For acute ear pain</li>
                <li>• <strong>Hepar Sulph:</strong> For infected discharge</li>
                <li>• <strong>Pulsatilla:</strong> For thick yellow discharge</li>
                <li>• <strong>Mercurius:</strong> For offensive discharge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default EarSinusInfections;
