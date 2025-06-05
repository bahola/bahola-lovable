
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const NasalPolyps = () => {
  const concern = healthConcernsData.find(c => c.id === 'nasal-polyps')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Nasal Polyps
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Nasal polyps are non-cancerous growths in the nasal passages that can cause breathing 
            difficulties and loss of smell. Homeopathy offers gentle treatment to reduce polyps naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Nasal obstruction</li>
                <li>• Loss of smell and taste</li>
                <li>• Runny nose</li>
                <li>• Facial pressure</li>
                <li>• Snoring</li>
                <li>• Frequent sinus infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Teucrium Marum:</strong> For nasal polyps</li>
                <li>• <strong>Calcarea Carbonica:</strong> For chronic cases</li>
                <li>• <strong>Sanguinaria:</strong> For right-sided polyps</li>
                <li>• <strong>Lemna Minor:</strong> For polyps with loss of smell</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default NasalPolyps;
