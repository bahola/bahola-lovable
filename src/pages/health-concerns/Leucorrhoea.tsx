
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Leucorrhoea = () => {
  const concern = healthConcernsData.find(c => c.id === 'leucorrhoea')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Leucorrhoea
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Leucorrhoea refers to abnormal vaginal discharge that can cause discomfort and concern. 
            Homeopathy offers gentle, natural treatment to restore normal vaginal health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Characteristics:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Excessive white discharge</li>
                <li>• Itching and irritation</li>
                <li>• Unpleasant odor</li>
                <li>• Burning sensation</li>
                <li>• Pelvic discomfort</li>
                <li>• Weakness and fatigue</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For bearing-down sensations</li>
                <li>• <strong>Calcarea Carbonica:</strong> For milky white discharge</li>
                <li>• <strong>Kreosotum:</strong> For offensive discharge</li>
                <li>• <strong>Alumina:</strong> For chronic discharge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Leucorrhoea;
