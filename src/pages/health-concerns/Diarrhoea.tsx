
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Diarrhoea = () => {
  const concern = healthConcernsData.find(c => c.id === 'diarrhoea')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Diarrhoea
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Diarrhoea is characterized by frequent loose or watery stools and can be caused by 
            infections, food poisoning, or digestive disorders. Homeopathy offers gentle, effective relief.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Viral or bacterial infections</li>
                <li>• Food poisoning</li>
                <li>• Digestive disorders</li>
                <li>• Medication side effects</li>
                <li>• Stress and anxiety</li>
                <li>• Food intolerances</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For watery, burning stools</li>
                <li>• <strong>Podophyllum:</strong> For profuse, gushing diarrhea</li>
                <li>• <strong>Veratrum Album:</strong> For exhausting diarrhea</li>
                <li>• <strong>China:</strong> For weakness after fluid loss</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Diarrhoea;
