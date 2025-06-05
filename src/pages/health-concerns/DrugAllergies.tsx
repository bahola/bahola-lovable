
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const DrugAllergies = () => {
  const concern = healthConcernsData.find(c => c.id === 'drug-allergies')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Drug Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Drug allergies can range from mild skin reactions to severe life-threatening responses. 
            Homeopathy offers gentle support to reduce sensitivity and manage allergic reactions naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Drug Allergens:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Antibiotics (Penicillin, Sulfa drugs)</li>
                <li>• Pain medications (NSAIDs, Aspirin)</li>
                <li>• Anesthetics</li>
                <li>• Contrast dyes</li>
                <li>• Chemotherapy drugs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Apis Mellifica:</strong> For swelling and hives</li>
                <li>• <strong>Urtica Urens:</strong> For skin eruptions</li>
                <li>• <strong>Sulphur:</strong> For chronic reactions</li>
                <li>• <strong>Nux Vomica:</strong> For digestive upset</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default DrugAllergies;
