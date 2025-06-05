
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ViralInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'viral-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Viral Infections
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy provides comprehensive support for various viral infections by boosting 
            immunity and helping the body's natural healing processes.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Viral Conditions:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Influenza and flu symptoms</li>
                <li>• Common cold viruses</li>
                <li>• Warts (all types)</li>
                <li>• Cold sores and herpes</li>
                <li>• Viral skin eruptions</li>
                <li>• Viral fever</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Oscillococcinum:</strong> For flu prevention and treatment</li>
                <li>• <strong>Thuja:</strong> For warts and viral skin conditions</li>
                <li>• <strong>Rhus Tox:</strong> For herpes and viral rashes</li>
                <li>• <strong>Natrum Muriaticum:</strong> For cold sores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ViralInfections;
