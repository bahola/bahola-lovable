
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PrematureGreying = () => {
  const concern = healthConcernsData.find(c => c.id === 'premature-greying')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Premature Greying
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Premature greying can occur due to various factors including genetics, stress, and 
            nutritional deficiencies. Homeopathy provides natural support to slow the process and maintain hair health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Contributing Factors:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Genetic predisposition</li>
                <li>• Chronic stress</li>
                <li>• Nutritional deficiencies</li>
                <li>• Smoking and lifestyle factors</li>
                <li>• Autoimmune conditions</li>
                <li>• Thyroid disorders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Lycopodium:</strong> For early greying with hair loss</li>
                <li>• <strong>Phosphoric Acid:</strong> For greying due to grief/stress</li>
                <li>• <strong>Sulphur:</strong> For general hair and scalp health</li>
                <li>• <strong>Natrum Muriaticum:</strong> For stress-related greying</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PrematureGreying;
