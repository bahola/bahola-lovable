
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const RecurrentFevers = () => {
  const concern = healthConcernsData.find(c => c.id === 'recurrent-fevers')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Managing Recurrent Fever Patterns
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy addresses the underlying causes of recurrent fevers, helping to break 
            the cycle and strengthen the immune system's response to infections.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Fever Patterns:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Recurring monthly fevers</li>
                <li>• Seasonal fever patterns</li>
                <li>• Weekly fever episodes</li>
                <li>• Post-illness recurring fevers</li>
                <li>• Unexplained fever cycles</li>
                <li>• Stress-triggered fevers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>China:</strong> For periodic fever patterns</li>
                <li>• <strong>Arsenicum Album:</strong> For recurring weakness with fever</li>
                <li>• <strong>Sulphur:</strong> For chronic fever tendencies</li>
                <li>• <strong>Phosphorus:</strong> For fever with perspiration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default RecurrentFevers;
