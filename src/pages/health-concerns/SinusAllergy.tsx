
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SinusAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'sinus-allergy')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Comprehensive Sinus Allergy Care
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Chronic sinus allergies can significantly impact quality of life. Homeopathy addresses 
            the underlying sensitivity while providing natural relief from congestion and inflammation.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Sinus Allergy Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Chronic sinus congestion</li>
                <li>• Facial pressure and pain</li>
                <li>• Thick nasal discharge</li>
                <li>• Reduced sense of smell</li>
                <li>• Postnasal drip</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Kali Bichromicum:</strong> For thick, stringy discharge</li>
                <li>• <strong>Silicea:</strong> For chronic sinusitis</li>
                <li>• <strong>Pulsatilla:</strong> For changeable discharge</li>
                <li>• <strong>Hepar Sulph:</strong> For infected sinuses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SinusAllergy;
