
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const RecurrentColdsCough = () => {
  const concern = healthConcernsData.find(c => c.id === 'recurrent-colds-cough')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Recurrent Colds and Cough
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Frequent colds and persistent coughs indicate weakened immunity. Homeopathy helps 
            strengthen your natural defenses and reduce the frequency of respiratory infections.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Signs:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Catching colds frequently</li>
                <li>• Persistent or recurring cough</li>
                <li>• Slow recovery from infections</li>
                <li>• Seasonal susceptibility</li>
                <li>• Chronic nasal congestion</li>
                <li>• Reduced energy during illness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For frequent colds with anxiety</li>
                <li>• <strong>Hepar Sulph:</strong> For coughs with thick secretions</li>
                <li>• <strong>Silicea:</strong> For strengthening overall immunity</li>
                <li>• <strong>Calcarea Carbonica:</strong> For constitutional weakness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default RecurrentColdsCough;
