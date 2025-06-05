
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const CancerRelatedFatigue = () => {
  const concern = healthConcernsData.find(c => c.id === 'cancer-related-fatigue')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Support for Cancer-Related Fatigue
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Cancer-related fatigue is a persistent exhaustion that affects quality of life. 
            Homeopathy provides gentle support to help restore energy and vitality naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Fatigue Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Persistent exhaustion</li>
                <li>• Physical weakness</li>
                <li>• Mental fog</li>
                <li>• Difficulty concentrating</li>
                <li>• Lack of motivation</li>
                <li>• Sleep disturbances</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For weakness and anxiety</li>
                <li>• <strong>Phosphoric Acid:</strong> For mental exhaustion</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For physical weakness</li>
                <li>• <strong>Gelsemium:</strong> For muscle weakness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default CancerRelatedFatigue;
