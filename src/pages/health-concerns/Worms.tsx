
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Worms = () => {
  const concern = healthConcernsData.find(c => c.id === 'worms')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Intestinal Worms
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Intestinal worms are parasites that can cause digestive discomfort and health issues. 
            Homeopathy offers natural, gentle treatment to eliminate parasites and restore gut health.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Abdominal pain</li>
                <li>• Itching around anus</li>
                <li>• Loss of appetite or increased hunger</li>
                <li>• Nausea and vomiting</li>
                <li>• Restless sleep</li>
                <li>• Grinding teeth at night</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Cina:</strong> For roundworms and pinworms</li>
                <li>• <strong>Teucrium:</strong> For pinworms with itching</li>
                <li>• <strong>Filix Mas:</strong> For tapeworms</li>
                <li>• <strong>Spigelia:</strong> For various intestinal worms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Worms;
