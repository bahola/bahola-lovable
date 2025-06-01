
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const EyeProblems = () => {
  const concern = healthConcernsData.find(c => c.id === 'eye-problems')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Eye Care
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies can help with various eye problems, supporting eye health 
            and providing relief from common eye-related discomforts.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Issues:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Dry eyes</li>
                <li>• Eye strain and fatigue</li>
                <li>• Conjunctivitis</li>
                <li>• Blurred vision</li>
                <li>• Eye allergies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Euphrasia:</strong> For eye inflammation</li>
                <li>• <strong>Ruta:</strong> For eye strain</li>
                <li>• <strong>Calc Fluor:</strong> For vision support</li>
                <li>• <strong>Silicea:</strong> For chronic eye issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default EyeProblems;
