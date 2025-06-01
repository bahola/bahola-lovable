
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ColdFlu = () => {
  const concern = healthConcernsData.find(c => c.id === 'cold-flu')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Cold & Flu Recovery
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies can help boost immunity, reduce symptoms, and speed recovery 
            from common colds and flu naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Symptoms Treated:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Fever and chills</li>
                <li>• Cough and congestion</li>
                <li>• Sore throat</li>
                <li>• Body aches</li>
                <li>• Runny or stuffy nose</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Oscillococcinum:</strong> For flu prevention</li>
                <li>• <strong>Aconite:</strong> For sudden onset</li>
                <li>• <strong>Belladonna:</strong> For high fever</li>
                <li>• <strong>Arsenicum:</strong> For weakness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ColdFlu;
