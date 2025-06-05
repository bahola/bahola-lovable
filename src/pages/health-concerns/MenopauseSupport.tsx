
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const MenopauseSupport = () => {
  const concern = healthConcernsData.find(c => c.id === 'menopause-support')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Menopause
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Menopause is a natural transition in a woman's life that can bring various physical and emotional 
            changes. Homeopathy offers gentle, natural support to ease this transition and manage symptoms effectively.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Hot flashes and night sweats</li>
                <li>• Mood swings and irritability</li>
                <li>• Sleep disturbances</li>
                <li>• Vaginal dryness</li>
                <li>• Weight gain</li>
                <li>• Fatigue and low energy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For hot flashes and mood changes</li>
                <li>• <strong>Lachesis:</strong> For hot flashes and emotional symptoms</li>
                <li>• <strong>Pulsatilla:</strong> For changeable moods and symptoms</li>
                <li>• <strong>Calcarea Carbonica:</strong> For weight gain and fatigue</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default MenopauseSupport;
