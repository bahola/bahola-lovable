
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PainfulPeriods = () => {
  const concern = healthConcernsData.find(c => c.id === 'painful-periods')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief for Painful Periods
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Dysmenorrhoea or painful periods can significantly impact daily life. Homeopathy provides 
            natural, effective pain relief without the side effects of conventional painkillers.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Severe menstrual cramps</li>
                <li>• Lower back pain</li>
                <li>• Nausea and vomiting</li>
                <li>• Headaches</li>
                <li>• Mood changes</li>
                <li>• Fatigue and weakness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Magnesium Phosphoricum:</strong> For cramping pain</li>
                <li>• <strong>Colocynthis:</strong> For severe cramping</li>
                <li>• <strong>Pulsatilla:</strong> For changeable pain patterns</li>
                <li>• <strong>Chamomilla:</strong> For intolerable pain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PainfulPeriods;
