
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const HighCholesterol = () => {
  const concern = healthConcernsData.find(c => c.id === 'high-cholesterol')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Management of High Cholesterol
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            High cholesterol can increase the risk of heart disease. Homeopathy offers natural 
            support to help manage cholesterol levels and promote cardiovascular health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Signs & Risk Factors:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Elevated LDL cholesterol</li>
                <li>• Low HDL cholesterol</li>
                <li>• Family history</li>
                <li>• Obesity</li>
                <li>• Sedentary lifestyle</li>
                <li>• Poor diet</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Cholesterinum:</strong> For high cholesterol</li>
                <li>• <strong>Crataegus:</strong> For heart support</li>
                <li>• <strong>Allium Sativum:</strong> For lipid metabolism</li>
                <li>• <strong>Baryta Carbonica:</strong> For arterial health</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default HighCholesterol;
