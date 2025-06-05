
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LatexAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'latex-allergy')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Approach to Latex Sensitivity
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Latex allergies can range from mild skin reactions to severe systemic responses. 
            Homeopathy provides gentle support to reduce sensitivity and manage reactions naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Latex Sources:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Medical gloves and equipment</li>
                <li>• Balloons and rubber bands</li>
                <li>• Rubber shoes and clothing</li>
                <li>• Dental materials</li>
                <li>• Household rubber products</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Apis Mellifica:</strong> For swelling and hives</li>
                <li>• <strong>Urtica Urens:</strong> For contact reactions</li>
                <li>• <strong>Rhus Toxicodendron:</strong> For vesicular eruptions</li>
                <li>• <strong>Sulphur:</strong> For chronic sensitivity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LatexAllergy;
