
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const AnxietySleepDisordersCancer = () => {
  const concern = healthConcernsData.find(c => c.id === 'anxiety-sleep-disorders-cancer')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Emotional Support During Cancer Journey
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Anxiety and sleep disorders are common during cancer treatment. Homeopathy offers 
            gentle emotional support to help manage stress and restore peaceful sleep.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Challenges:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Fear and anxiety</li>
                <li>• Difficulty falling asleep</li>
                <li>• Frequent awakening</li>
                <li>• Racing thoughts</li>
                <li>• Panic attacks</li>
                <li>• Emotional overwhelm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Ignatia:</strong> For grief and emotional shock</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety and restlessness</li>
                <li>• <strong>Coffea Cruda:</strong> For sleeplessness</li>
                <li>• <strong>Aconite:</strong> For panic and fear</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default AnxietySleepDisordersCancer;
