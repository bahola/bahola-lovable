
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const AlopeciaAreata = () => {
  const concern = healthConcernsData.find(c => c.id === 'alopecia-areata')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Alopecia Areata
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Alopecia areata is an autoimmune condition causing patchy hair loss. Homeopathy 
            provides gentle support to help stimulate hair regrowth and boost immune function.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Characteristic Features:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Round or oval bald patches</li>
                <li>• Smooth, shiny scalp</li>
                <li>• Sudden onset</li>
                <li>• May affect eyebrows/eyelashes</li>
                <li>• Sometimes nail changes</li>
                <li>• Emotional stress trigger</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Phosphorus:</strong> For patchy hair loss</li>
                <li>• <strong>Fluoric Acid:</strong> For alopecia areata</li>
                <li>• <strong>Arsenicum Album:</strong> For stress-related hair loss</li>
                <li>• <strong>Silicea:</strong> For strengthening hair follicles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default AlopeciaAreata;
