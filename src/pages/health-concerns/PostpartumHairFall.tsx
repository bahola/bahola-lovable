
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PostpartumHairFall = () => {
  const concern = healthConcernsData.find(c => c.id === 'postpartum-hair-fall')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Postpartum Hair Fall
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Hair fall after pregnancy is common due to hormonal changes. Homeopathy provides 
            gentle, safe support for new mothers to restore hair health naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Why It Happens:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Hormonal fluctuations</li>
                <li>• Estrogen level changes</li>
                <li>• Nutritional deficiencies</li>
                <li>• Physical stress of childbirth</li>
                <li>• Lack of sleep</li>
                <li>• Breastfeeding demands</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For hormonal hair loss</li>
                <li>• <strong>Lycopodium:</strong> For postpartum hair thinning</li>
                <li>• <strong>Phosphorus:</strong> For overall hair health</li>
                <li>• <strong>Calcarea Carbonica:</strong> For slow recovery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PostpartumHairFall;
