
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SkinAllergies = () => {
  const concern = healthConcernsData.find(c => c.id === 'skin-allergies')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Skin Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Skin allergies manifest as hives, eczema, and urticaria. Homeopathy treats the root cause 
            and strengthens the skin's natural defense mechanisms for lasting relief.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types of Skin Allergies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Urticaria (Hives)</li>
                <li>• Contact dermatitis</li>
                <li>• Atopic eczema</li>
                <li>• Allergic rashes</li>
                <li>• Angioedema</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Apis Mellifica:</strong> For swelling and burning</li>
                <li>• <strong>Urtica Urens:</strong> For nettle-like rash</li>
                <li>• <strong>Graphites:</strong> For eczematous conditions</li>
                <li>• <strong>Sulphur:</strong> For chronic skin issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SkinAllergies;
