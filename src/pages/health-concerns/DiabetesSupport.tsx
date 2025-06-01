
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const DiabetesSupport = () => {
  const concern = healthConcernsData.find(c => c.id === 'diabetes-support')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Complementary Diabetes Care
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy can provide supportive care for diabetes management, helping to improve 
            overall well-being alongside conventional treatment.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Areas of Support:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Blood sugar regulation support</li>
                <li>• Improved energy levels</li>
                <li>• Better wound healing</li>
                <li>• Circulation improvement</li>
                <li>• Stress management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Syzygium:</strong> For blood sugar support</li>
                <li>• <strong>Uranium Nit:</strong> For diabetic symptoms</li>
                <li>• <strong>Phosphoric Acid:</strong> For weakness</li>
                <li>• <strong>Bryonia:</strong> For thirst and dryness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default DiabetesSupport;
