
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const FrequentInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'frequent-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Frequent Infections
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Repeated infections indicate compromised immunity. Homeopathy works to strengthen 
            your body's natural defense mechanisms and reduce susceptibility to infections.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types of Infections:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Respiratory tract infections</li>
                <li>• Urinary tract infections</li>
                <li>• Skin infections</li>
                <li>• Ear and throat infections</li>
                <li>• Digestive infections</li>
                <li>• Fungal infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Echinacea:</strong> For boosting immune response</li>
                <li>• <strong>Arsenicum Album:</strong> For recurring infections</li>
                <li>• <strong>Phosphorus:</strong> For weakness and susceptibility</li>
                <li>• <strong>Sulphur:</strong> For chronic infectious tendencies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default FrequentInfections;
