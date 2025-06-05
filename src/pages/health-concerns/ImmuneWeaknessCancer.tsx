
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ImmuneWeaknessCancer = () => {
  const concern = healthConcernsData.find(c => c.id === 'immune-weakness-cancer')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Immune Support for Cancer Patients
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Cancer and its treatments can weaken the immune system. Homeopathy offers gentle 
            support to help strengthen natural defenses and improve overall resilience.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Signs of Immune Weakness:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Frequent infections</li>
                <li>• Slow wound healing</li>
                <li>• Persistent fatigue</li>
                <li>• Recurrent colds</li>
                <li>• Poor recovery</li>
                <li>• Low white blood cells</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Echinacea:</strong> For immune stimulation</li>
                <li>• <strong>Arsenicum Album:</strong> For general weakness</li>
                <li>• <strong>Phosphorus:</strong> For infection susceptibility</li>
                <li>• <strong>Silicea:</strong> For tissue strength</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ImmuneWeaknessCancer;
