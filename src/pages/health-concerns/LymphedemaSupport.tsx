
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LymphedemaSupport = () => {
  const concern = healthConcernsData.find(c => c.id === 'lymphedema-support')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Supportive Care for Lymphedema
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Lymphedema can occur after cancer treatment affecting lymph nodes. Homeopathy 
            provides supportive care to help manage swelling and improve lymphatic drainage.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Lymphedema Signs:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Persistent swelling</li>
                <li>• Heaviness in limbs</li>
                <li>• Reduced mobility</li>
                <li>• Tight feeling</li>
                <li>• Hardening of tissue</li>
                <li>• Recurring infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Apis Mellifica:</strong> For fluid retention</li>
                <li>• <strong>Lymphomyosot:</strong> For lymphatic drainage</li>
                <li>• <strong>Calcarea Carbonica:</strong> For tissue swelling</li>
                <li>• <strong>Natrum Sulph:</strong> For water retention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LymphedemaSupport;
