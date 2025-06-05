
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ConvalescenceRemedies = () => {
  const concern = healthConcernsData.find(c => c.id === 'convalescence-remedies')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Convalescence Support
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            The convalescence period requires specialized care to ensure complete recovery. 
            Homeopathy provides gentle, effective support during this crucial healing phase.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Recovery Support For:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Post-surgical recovery</li>
                <li>• After serious illness</li>
                <li>• Chronic disease management</li>
                <li>• Accident recovery</li>
                <li>• Emotional trauma healing</li>
                <li>• Rehabilitation support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>China:</strong> For weakness and blood loss</li>
                <li>• <strong>Arnica Montana:</strong> For trauma recovery</li>
                <li>• <strong>Calcarea Phosphorica:</strong> For tissue repair</li>
                <li>• <strong>Silicea:</strong> For slow healing wounds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ConvalescenceRemedies;
