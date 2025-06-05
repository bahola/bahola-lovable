
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ElderlyImmuneSupport = () => {
  const concern = healthConcernsData.find(c => c.id === 'elderly-immune-support')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Gentle Immune Support for Elderly
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Age-related immune decline requires specialized care. Homeopathy provides gentle, 
            effective support to strengthen immunity and improve overall health in elderly individuals.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Age-Related Changes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Weakened immune response</li>
                <li>• Slower recovery from illness</li>
                <li>• Increased infection susceptibility</li>
                <li>• Reduced vaccine effectiveness</li>
                <li>• Chronic inflammation</li>
                <li>• Multiple health conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For anxiety and weakness</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For poor circulation</li>
                <li>• <strong>Baryta Carbonica:</strong> For age-related weakness</li>
                <li>• <strong>Silicea:</strong> For slow healing and infections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ElderlyImmuneSupport;
