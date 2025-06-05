
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LossOfAppetiteGut = () => {
  const concern = healthConcernsData.find(c => c.id === 'loss-of-appetite-gut')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Loss of Appetite
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Loss of appetite can significantly impact nutrition and overall health. Homeopathy helps 
            restore natural hunger and improve digestive function to support healthy eating.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Digestive disorders</li>
                <li>• Depression and anxiety</li>
                <li>• Medications</li>
                <li>• Chronic illness</li>
                <li>• Age-related changes</li>
                <li>• Stress and lifestyle factors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>China:</strong> For weakness and poor appetite</li>
                <li>• <strong>Lycopodium:</strong> For digestive weakness</li>
                <li>• <strong>Pulsatilla:</strong> For changeable appetite</li>
                <li>• <strong>Natrum Muriaticum:</strong> For emotional causes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LossOfAppetiteGut;
