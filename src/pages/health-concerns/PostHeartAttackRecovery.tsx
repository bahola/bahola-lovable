
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PostHeartAttackRecovery = () => {
  const concern = healthConcernsData.find(c => c.id === 'post-heart-attack-recovery')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Supporting Recovery After Heart Attack
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Recovery after a heart attack requires comprehensive care. Homeopathy provides gentle 
            supportive care to aid in healing and strengthen the cardiovascular system.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Recovery Support Areas:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Heart muscle healing</li>
                <li>• Improved circulation</li>
                <li>• Reduced inflammation</li>
                <li>• Emotional support</li>
                <li>• Energy restoration</li>
                <li>• Stress management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arnica Montana:</strong> For trauma and healing</li>
                <li>• <strong>Crataegus:</strong> For heart strengthening</li>
                <li>• <strong>Cactus Grandiflorus:</strong> For heart support</li>
                <li>• <strong>Phosphorus:</strong> For tissue regeneration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PostHeartAttackRecovery;
