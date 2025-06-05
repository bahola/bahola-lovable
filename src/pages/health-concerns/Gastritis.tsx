
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Gastritis = () => {
  const concern = healthConcernsData.find(c => c.id === 'gastritis')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Gastritis
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Gastritis is inflammation of the stomach lining that can cause pain, nausea, and digestive 
            issues. Homeopathy offers gentle healing to restore stomach health naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• H. pylori bacterial infection</li>
                <li>• NSAIDs and medications</li>
                <li>• Excessive alcohol consumption</li>
                <li>• Stress and anxiety</li>
                <li>• Spicy or acidic foods</li>
                <li>• Autoimmune disorders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For burning stomach pain</li>
                <li>• <strong>Nux Vomica:</strong> For gastritis from lifestyle factors</li>
                <li>• <strong>Phosphorus:</strong> For erosive gastritis</li>
                <li>• <strong>Antimonium Crudum:</strong> For gastritis with nausea</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Gastritis;
