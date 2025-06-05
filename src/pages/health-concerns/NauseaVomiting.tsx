
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const NauseaVomiting = () => {
  const concern = healthConcernsData.find(c => c.id === 'nausea-vomiting')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief for Nausea & Vomiting
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Nausea and vomiting can have various causes including pregnancy, motion sickness, or digestive 
            issues. Homeopathy provides gentle, effective relief without side effects.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Pregnancy (morning sickness)</li>
                <li>• Motion sickness</li>
                <li>• Food poisoning</li>
                <li>• Medications</li>
                <li>• Stress and anxiety</li>
                <li>• Digestive disorders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Ipecacuanha:</strong> For persistent nausea</li>
                <li>• <strong>Nux Vomica:</strong> For nausea with retching</li>
                <li>• <strong>Arsenicum Album:</strong> For nausea with weakness</li>
                <li>• <strong>Pulsatilla:</strong> For nausea from rich foods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default NauseaVomiting;
