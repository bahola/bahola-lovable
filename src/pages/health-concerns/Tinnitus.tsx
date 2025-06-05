
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Tinnitus = () => {
  const concern = healthConcernsData.find(c => c.id === 'tinnitus')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Tinnitus
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Tinnitus is the perception of ringing, buzzing, or other sounds in the ears without 
            an external source. Homeopathy addresses the underlying causes to provide relief.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types of Sounds:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Ringing or buzzing</li>
                <li>• Hissing or whistling</li>
                <li>• Clicking or pulsing</li>
                <li>• Roaring sounds</li>
                <li>• Musical tones</li>
                <li>• Continuous or intermittent</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Chininum Sulphuricum:</strong> For ringing sounds</li>
                <li>• <strong>Graphites:</strong> For crackling sounds</li>
                <li>• <strong>Calcarea Carbonica:</strong> For pulsating tinnitus</li>
                <li>• <strong>Lycopodium:</strong> For buzzing sounds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Tinnitus;
