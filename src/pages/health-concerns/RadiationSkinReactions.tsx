
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const RadiationSkinReactions = () => {
  const concern = healthConcernsData.find(c => c.id === 'radiation-skin-reactions')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Gentle Care for Radiation Skin Reactions
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Radiation therapy can cause skin irritation, burns, and sensitivity. Homeopathy offers 
            gentle supportive care to help manage these side effects and promote healing.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Skin Reactions:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Redness and irritation</li>
                <li>• Dry, peeling skin</li>
                <li>• Burning sensation</li>
                <li>• Blistering</li>
                <li>• Hyperpigmentation</li>
                <li>• Increased sensitivity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Calendula:</strong> For healing and repair</li>
                <li>• <strong>Cantharis:</strong> For burning skin</li>
                <li>• <strong>Causticum:</strong> For burns and scarring</li>
                <li>• <strong>Radium Bromatum:</strong> For radiation effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default RadiationSkinReactions;
