
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const MoldAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'mold-allergy')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Homeopathic Treatment for Mold Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Mold allergies can cause year-round symptoms, especially in damp environments. 
            Homeopathy strengthens the immune system to better cope with mold exposure naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Mold Sources:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Damp basements and bathrooms</li>
                <li>• Air conditioning systems</li>
                <li>• Outdoor soil and vegetation</li>
                <li>• Water-damaged buildings</li>
                <li>• Humid climates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For burning respiratory symptoms</li>
                <li>• <strong>Sulphur:</strong> For skin manifestations</li>
                <li>• <strong>Thuja:</strong> For chronic mold exposure</li>
                <li>• <strong>Natrum Sulph:</strong> For damp weather aggravation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default MoldAllergy;
