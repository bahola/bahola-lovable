
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const HighBloodPressure = () => {
  const concern = healthConcernsData.find(c => c.id === 'high-blood-pressure')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Blood Pressure Support
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy can provide complementary support for blood pressure management as part 
            of a comprehensive approach to cardiovascular health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Risk Factors:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Stress and anxiety</li>
                <li>• Poor diet and lifestyle</li>
                <li>• Lack of exercise</li>
                <li>• Family history</li>
                <li>• Age and weight</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Crataegus:</strong> For heart support</li>
                <li>• <strong>Viscum Album:</strong> For circulation</li>
                <li>• <strong>Baryta Carb:</strong> For elderly patients</li>
                <li>• <strong>Nat Mur:</strong> For stress-related BP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default HighBloodPressure;
