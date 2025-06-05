
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const BreastTenderness = () => {
  const concern = healthConcernsData.find(c => c.id === 'breast-tenderness')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief for Breast Tenderness
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Breast tenderness and soreness can occur due to hormonal changes, menstrual cycles, or other factors. 
            Homeopathy offers gentle, natural relief from breast discomfort.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Menstrual cycle changes</li>
                <li>• Pregnancy and breastfeeding</li>
                <li>• Hormonal fluctuations</li>
                <li>• Breast cysts</li>
                <li>• Stress and lifestyle factors</li>
                <li>• Medications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Conium Maculatum:</strong> For hard, tender breasts</li>
                <li>• <strong>Phytolacca:</strong> For shooting pains</li>
                <li>• <strong>Bryonia:</strong> For pain worse with movement</li>
                <li>• <strong>Belladonna:</strong> For throbbing pain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default BreastTenderness;
