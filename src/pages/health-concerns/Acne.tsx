
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Acne = () => {
  const concern = healthConcernsData.find(c => c.id === 'acne-pimples')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Acne Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Acne affects people of all ages and can impact self-confidence. Homeopathic treatment 
            addresses the root causes of acne, promoting clear, healthy skin naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Types of Acne:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Blackheads and whiteheads</li>
                <li>• Inflammatory papules</li>
                <li>• Painful cystic acne</li>
                <li>• Hormonal acne</li>
                <li>• Adult acne</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Effective Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sulphur:</strong> For oily skin and blackheads</li>
                <li>• <strong>Hepar Sulph:</strong> For infected, pus-filled acne</li>
                <li>• <strong>Kali Bromatum:</strong> For deep, cystic acne</li>
                <li>• <strong>Natrum Muriaticum:</strong> For hormonal acne</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Acne;
