
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const AllergicRhinitis = () => {
  const concern = healthConcernsData.find(c => c.id === 'allergic-rhinitis')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Comprehensive Care for Allergic Rhinitis
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Allergic rhinitis, commonly known as hay fever, affects millions worldwide. 
            Homeopathy provides natural relief by treating the underlying sensitivity and strengthening immunity.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Runny or stuffy nose</li>
                <li>• Sneezing fits</li>
                <li>• Itchy, watery eyes</li>
                <li>• Postnasal drip</li>
                <li>• Sinus pressure</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Allium Cepa:</strong> For watery discharge</li>
                <li>• <strong>Arsenicum Album:</strong> For burning nasal discharge</li>
                <li>• <strong>Euphrasia:</strong> For eye symptoms</li>
                <li>• <strong>Sabadilla:</strong> For violent sneezing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default AllergicRhinitis;
