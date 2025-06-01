
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const DigestiveIssues = () => {
  const concern = healthConcernsData.find(c => c.id === 'digestive-issues')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Digestive Health
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Digestive issues can significantly impact your quality of life. Homeopathy offers gentle, 
            effective solutions for various digestive complaints by addressing root causes.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Issues:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Bloating and gas</li>
                <li>• Acid reflux and heartburn</li>
                <li>• Constipation or diarrhea</li>
                <li>• Irritable bowel syndrome</li>
                <li>• Nausea and indigestion</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Nux Vomica:</strong> For overindulgence</li>
                <li>• <strong>Lycopodium:</strong> For bloating</li>
                <li>• <strong>Carbo Veg:</strong> For gas and flatulence</li>
                <li>• <strong>Pulsatilla:</strong> For rich food intolerance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default DigestiveIssues;
