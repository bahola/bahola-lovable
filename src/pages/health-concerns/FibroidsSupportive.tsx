
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const FibroidsSupportive = () => {
  const concern = healthConcernsData.find(c => c.id === 'fibroids-supportive')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Supportive Care for Uterine Fibroids
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Uterine fibroids are non-cancerous growths that can cause various symptoms. Homeopathy provides 
            supportive care to help manage symptoms and support overall reproductive health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Heavy menstrual bleeding</li>
                <li>• Prolonged periods</li>
                <li>• Pelvic pressure and pain</li>
                <li>• Frequent urination</li>
                <li>• Constipation</li>
                <li>• Back or leg pain</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Calcarea Carbonica:</strong> For slow growth and congestion</li>
                <li>• <strong>Fraxinus Americana:</strong> For uterine congestion</li>
                <li>• <strong>Thlaspi Bursa Pastoris:</strong> For heavy bleeding</li>
                <li>• <strong>Sepia:</strong> For bearing-down sensations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default FibroidsSupportive;
