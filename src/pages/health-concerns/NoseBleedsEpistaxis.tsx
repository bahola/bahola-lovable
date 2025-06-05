
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const NoseBleedsEpistaxis = () => {
  const concern = healthConcernsData.find(c => c.id === 'nose-bleeds')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Nosebleeds
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Nosebleeds (epistaxis) can be caused by various factors including dry air, trauma, 
            or underlying conditions. Homeopathy helps strengthen blood vessels and reduce bleeding tendency.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Causes:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Dry air or climate</li>
                <li>• Nose picking or trauma</li>
                <li>• Allergies</li>
                <li>• High blood pressure</li>
                <li>• Blood thinning medications</li>
                <li>• Nasal infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Phosphorus:</strong> For frequent nosebleeds</li>
                <li>• <strong>Arnica Montana:</strong> For trauma-related bleeding</li>
                <li>• <strong>Ferrum Phosphoricum:</strong> For bright red blood</li>
                <li>• <strong>Ipecacuanha:</strong> For profuse bleeding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default NoseBleedsEpistaxis;
