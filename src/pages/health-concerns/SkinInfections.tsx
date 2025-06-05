
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SkinInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'skin-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Comprehensive Skin Infection Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy addresses skin infections holistically, treating both the infection 
            and the underlying susceptibility to prevent recurrence.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types of Infections:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Bacterial skin infections</li>
                <li>• Infected eczema or dermatitis</li>
                <li>• Infected wounds and cuts</li>
                <li>• Cellulitis</li>
                <li>• Pustular skin conditions</li>
                <li>• Secondary infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Hepar Sulph:</strong> For infected wounds with pus</li>
                <li>• <strong>Graphites:</strong> For infected eczema</li>
                <li>• <strong>Arsenicum Album:</strong> For burning skin infections</li>
                <li>• <strong>Mercurius:</strong> For ulcerative infections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SkinInfections;
