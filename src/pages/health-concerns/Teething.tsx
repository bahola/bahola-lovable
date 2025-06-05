
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Teething = () => {
  const concern = healthConcernsData.find(c => c.id === 'teething-troubles')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Gentle Teething Relief for Babies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Teething can be a challenging time for both babies and parents. Homeopathic remedies 
            provide safe, gentle relief for teething discomfort without side effects.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Teething Signs:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Excessive drooling</li>
                <li>• Irritability and fussiness</li>
                <li>• Desire to chew on objects</li>
                <li>• Disturbed sleep patterns</li>
                <li>• Red, swollen gums</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Safe Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Chamomilla:</strong> For irritable, restless babies</li>
                <li>• <strong>Calcarea Carbonica:</strong> For delayed teething</li>
                <li>• <strong>Belladonna:</strong> For sudden, intense pain</li>
                <li>• <strong>Pulsatilla:</strong> For clingy, weepy babies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Teething;
