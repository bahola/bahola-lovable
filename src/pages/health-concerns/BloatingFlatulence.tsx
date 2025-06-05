
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const BloatingFlatulence = () => {
  const concern = healthConcernsData.find(c => c.id === 'bloating-flatulence')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief from Bloating & Flatulence
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Bloating and flatulence are common digestive issues that can cause significant discomfort. 
            Homeopathy addresses the root causes to provide lasting relief from gas and abdominal distension.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Triggers:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Eating too quickly</li>
                <li>• Certain foods (beans, dairy, etc.)</li>
                <li>• Poor digestion</li>
                <li>• Stress and anxiety</li>
                <li>• Sedentary lifestyle</li>
                <li>• Digestive disorders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Carbo Vegetabilis:</strong> For severe bloating with gas</li>
                <li>• <strong>Lycopodium:</strong> For bloating after eating</li>
                <li>• <strong>Argentina Nitricum:</strong> For nervous flatulence</li>
                <li>• <strong>Nux Vomica:</strong> For bloating with constipation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default BloatingFlatulence;
