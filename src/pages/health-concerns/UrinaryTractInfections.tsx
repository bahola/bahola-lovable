
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const UrinaryTractInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'urinary-tract-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural UTI Treatment & Prevention
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy provides effective relief for urinary tract infections while supporting 
            overall urinary health and preventing recurrence.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">UTI Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Burning during urination</li>
                <li>• Frequent urination urges</li>
                <li>• Cloudy or bloody urine</li>
                <li>• Pelvic pain in women</li>
                <li>• Strong-smelling urine</li>
                <li>• Bladder pressure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Cantharis:</strong> For burning urination</li>
                <li>• <strong>Apis Mellifica:</strong> For stinging pain</li>
                <li>• <strong>Berberis:</strong> For kidney involvement</li>
                <li>• <strong>Equisetum:</strong> For bladder irritation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default UrinaryTractInfections;
