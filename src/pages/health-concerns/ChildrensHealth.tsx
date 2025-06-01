
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ChildrensHealth = () => {
  const concern = healthConcernsData.find(c => c.id === 'childrens-health')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Safe & Gentle Care for Children
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies are particularly well-suited for children, offering safe, 
            gentle treatment without side effects for common childhood ailments.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Issues:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Teething troubles</li>
                <li>• Colic and digestive issues</li>
                <li>• Sleep problems</li>
                <li>• Growing pains</li>
                <li>• Behavioral concerns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Chamomilla:</strong> For teething and irritability</li>
                <li>• <strong>Pulsatilla:</strong> For emotional children</li>
                <li>• <strong>Calc Carb:</strong> For growing pains</li>
                <li>• <strong>Sulphur:</strong> For skin conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ChildrensHealth;
