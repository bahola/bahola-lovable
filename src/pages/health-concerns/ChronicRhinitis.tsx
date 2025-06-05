
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ChronicRhinitis = () => {
  const concern = healthConcernsData.find(c => c.id === 'chronic-rhinitis')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Long-Term Relief for Chronic Rhinitis
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Chronic rhinitis is persistent inflammation of the nasal passages lasting more than 12 weeks. 
            Homeopathy addresses the underlying causes to provide lasting relief from nasal symptoms.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types & Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Persistent nasal congestion</li>
                <li>• Continuous runny nose</li>
                <li>• Postnasal drip</li>
                <li>• Reduced sense of smell</li>
                <li>• Facial pressure</li>
                <li>• Throat clearing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For burning nasal discharge</li>
                <li>• <strong>Pulsatilla:</strong> For thick, yellow discharge</li>
                <li>• <strong>Kali Bichromicum:</strong> For stringy mucus</li>
                <li>• <strong>Natrum Muriaticum:</strong> For clear, watery discharge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ChronicRhinitis;
