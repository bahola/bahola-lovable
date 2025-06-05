
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ThinningHair = () => {
  const concern = healthConcernsData.find(c => c.id === 'thinning-hair')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Thinning Hair
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Hair thinning is a gradual process that can affect anyone. Homeopathy helps strengthen 
            hair strands, improve hair density, and promote healthy hair growth naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Signs of Thinning:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Reduced hair volume</li>
                <li>• Weak, brittle hair strands</li>
                <li>• Visible scalp through hair</li>
                <li>• Hair breakage</li>
                <li>• Slow hair growth</li>
                <li>• Fine, wispy hair texture</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Lycopodium:</strong> For hair thinning from roots</li>
                <li>• <strong>Silicea:</strong> For strengthening weak hair</li>
                <li>• <strong>Phosphorus:</strong> For improving hair quality</li>
                <li>• <strong>Calcarea Carbonica:</strong> For slow hair growth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ThinningHair;
