
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ChildrensImmunityDrops = () => {
  const concern = healthConcernsData.find(c => c.id === 'childrens-immunity-drops')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Safe Immunity Support for Children
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Children's developing immune systems need gentle, safe support. Homeopathy provides 
            effective immunity enhancement without side effects, promoting natural resistance to infections.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Benefits for Children:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Reduced frequency of illness</li>
                <li>• Faster recovery times</li>
                <li>• Better resistance to infections</li>
                <li>• Improved overall health</li>
                <li>• Safe and gentle action</li>
                <li>• No harmful side effects</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Calcarea Carbonica:</strong> For constitutional weakness</li>
                <li>• <strong>Sulphur:</strong> For chronic tendency to infections</li>
                <li>• <strong>Silicea:</strong> For building strong immunity</li>
                <li>• <strong>Arsenicum Album:</strong> For anxious, restless children</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ChildrensImmunityDrops;
