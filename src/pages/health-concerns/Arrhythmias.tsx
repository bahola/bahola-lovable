
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Arrhythmias = () => {
  const concern = healthConcernsData.find(c => c.id === 'arrhythmias')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Heart Rhythm Disorders
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Arrhythmias are irregular heartbeats that can affect heart function. Homeopathy provides 
            gentle support to help regulate heart rhythm and improve cardiac health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Arrhythmia Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Irregular heartbeat</li>
                <li>• Heart palpitations</li>
                <li>• Chest discomfort</li>
                <li>• Shortness of breath</li>
                <li>• Dizziness or lightheadedness</li>
                <li>• Fatigue</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Digitalis:</strong> For irregular pulse</li>
                <li>• <strong>Cactus Grandiflorus:</strong> For heart rhythm</li>
                <li>• <strong>Convallaria:</strong> For heart weakness</li>
                <li>• <strong>Iberis Amara:</strong> For cardiac disorders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Arrhythmias;
