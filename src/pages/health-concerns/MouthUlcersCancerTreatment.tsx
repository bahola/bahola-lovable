
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const MouthUlcersCancerTreatment = () => {
  const concern = healthConcernsData.find(c => c.id === 'mouth-ulcers-cancer-treatment')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Gentle Care for Treatment-Related Mouth Ulcers
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Oral mucositis and mouth ulcers are painful side effects of cancer treatment. 
            Homeopathy offers gentle healing support for oral tissues and pain relief.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Oral Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Painful mouth sores</li>
                <li>• Difficulty swallowing</li>
                <li>• Bleeding gums</li>
                <li>• Dry mouth</li>
                <li>• Taste changes</li>
                <li>• Oral inflammation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Mercurius Sol:</strong> For ulcers and bleeding</li>
                <li>• <strong>Borax:</strong> For mouth ulcers</li>
                <li>• <strong>Nitric Acid:</strong> For painful sores</li>
                <li>• <strong>Calendula:</strong> For healing and repair</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default MouthUlcersCancerTreatment;
