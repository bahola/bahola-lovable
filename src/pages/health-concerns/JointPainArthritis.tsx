
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const JointPainArthritis = () => {
  const concern = healthConcernsData.find(c => c.id === 'joint-pain-arthritis')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Joint Pain Relief
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy offers gentle, effective treatment for joint pain and arthritis, 
            helping to reduce inflammation and improve mobility naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Conditions Treated:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Rheumatoid arthritis</li>
                <li>• Osteoarthritis</li>
                <li>• Joint stiffness</li>
                <li>• Muscle pain</li>
                <li>• Sports injuries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Rhus Tox:</strong> For stiffness</li>
                <li>• <strong>Bryonia:</strong> For pain worse with movement</li>
                <li>• <strong>Arnica:</strong> For trauma and bruising</li>
                <li>• <strong>Calc Carb:</strong> For chronic arthritis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default JointPainArthritis;
