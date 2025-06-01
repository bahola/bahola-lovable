
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const HeadachesMigraines = () => {
  const concern = healthConcernsData.find(c => c.id === 'headaches-migraines')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Headache & Migraine Relief
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy offers effective, natural relief for headaches and migraines by addressing 
            triggers and individual patterns of pain.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types of Headaches:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Tension headaches</li>
                <li>• Migraines with aura</li>
                <li>• Cluster headaches</li>
                <li>• Stress-related headaches</li>
                <li>• Hormonal headaches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Belladonna:</strong> For throbbing pain</li>
                <li>• <strong>Bryonia:</strong> For splitting headaches</li>
                <li>• <strong>Iris Versicolor:</strong> For migraines</li>
                <li>• <strong>Spigelia:</strong> For left-sided pain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default HeadachesMigraines;
