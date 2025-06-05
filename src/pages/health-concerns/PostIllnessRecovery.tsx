
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PostIllnessRecovery = () => {
  const concern = healthConcernsData.find(c => c.id === 'post-illness-recovery')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Post-Illness Recovery
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Recovery after illness requires rebuilding strength and vitality. Homeopathy provides 
            gentle support to accelerate healing and restore your body's natural energy.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Recovery Challenges:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Prolonged weakness</li>
                <li>• Slow healing process</li>
                <li>• Reduced appetite</li>
                <li>• Mental fatigue</li>
                <li>• Sleep disturbances</li>
                <li>• Emotional sensitivity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>China:</strong> For weakness after fluid loss</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety and restlessness</li>
                <li>• <strong>Phosphorus:</strong> For nervous exhaustion</li>
                <li>• <strong>Calcarea Carbonica:</strong> For slow recovery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PostIllnessRecovery;
