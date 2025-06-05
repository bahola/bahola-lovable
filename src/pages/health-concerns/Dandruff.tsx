
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Dandruff = () => {
  const concern = healthConcernsData.find(c => c.id === 'dandruff')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Dandruff
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Dandruff is a common scalp condition causing flaky, itchy skin. Homeopathy treats 
            the underlying causes of dandruff, promoting a healthy scalp naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• White or yellow flakes</li>
                <li>• Itchy scalp</li>
                <li>• Dry or oily scalp</li>
                <li>• Scalp irritation</li>
                <li>• Red, inflamed areas</li>
                <li>• Hair fall due to scratching</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sulphur:</strong> For dry, scaly dandruff</li>
                <li>• <strong>Graphites:</strong> For sticky, honey-like scales</li>
                <li>• <strong>Arsenicum Album:</strong> For burning, itchy scalp</li>
                <li>• <strong>Kali Sulph:</strong> For yellow, sticky scales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Dandruff;
