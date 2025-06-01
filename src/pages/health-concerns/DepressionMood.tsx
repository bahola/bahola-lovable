
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const DepressionMood = () => {
  const concern = healthConcernsData.find(c => c.id === 'depression-mood')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Mood Support
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy offers gentle support for depression and mood disorders, working to restore 
            emotional balance and overall well-being naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Symptoms Addressed:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Persistent sadness</li>
                <li>• Loss of interest</li>
                <li>• Mood swings</li>
                <li>• Lack of energy</li>
                <li>• Sleep disturbances</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Aurum Met:</strong> For deep depression</li>
                <li>• <strong>Ignatia:</strong> For grief and loss</li>
                <li>• <strong>Nat Mur:</strong> For suppressed emotions</li>
                <li>• <strong>Pulsatilla:</strong> For weepy moods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default DepressionMood;
