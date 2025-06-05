
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const FeverWithChills = () => {
  const concern = healthConcernsData.find(c => c.id === 'fever-with-chills')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Treatment for Fever with Chills
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy provides targeted treatment for fevers accompanied by chills and 
            intermittent patterns, addressing the complete symptom picture for faster recovery.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Symptoms Addressed:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Alternating fever and chills</li>
                <li>• Shivering with high temperature</li>
                <li>• Intermittent fever patterns</li>
                <li>• Malaria-like symptoms</li>
                <li>• Sweating stages</li>
                <li>• Periodic temperature spikes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>China:</strong> For intermittent fever patterns</li>
                <li>• <strong>Arsenicum Album:</strong> For chills with anxiety</li>
                <li>• <strong>Nux Vomica:</strong> For chills without thirst</li>
                <li>• <strong>Ignatia:</strong> For emotional fever patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default FeverWithChills;
