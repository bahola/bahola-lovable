
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const ChemotherapySideEffects = () => {
  const concern = healthConcernsData.find(c => c.id === 'chemotherapy-side-effects') || {
    id: 'chemotherapy-side-effects',
    name: 'Chemotherapy Side Effects',
    description: 'Homeopathic support for managing nausea, fatigue and other chemotherapy side effects',
    category: 'Cancer',
    icon: '💊',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 8900,
    commonRemedies: ['Ipecacuanha', 'Arsenicum Album', 'Phosphorus', 'Cadmium Sulphuricum'],
    keywords: ['chemotherapy', 'nausea', 'fatigue', 'cancer treatment'],
    lastUpdated: '2024-01-15',
    trending: true
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Managing Chemotherapy Side Effects
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Chemotherapy can cause various side effects including nausea, fatigue, and digestive issues. 
            Homeopathic remedies provide gentle support to help manage these challenging symptoms.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Side Effects:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Nausea and vomiting</li>
                <li>• Extreme fatigue</li>
                <li>• Loss of appetite</li>
                <li>• Hair loss</li>
                <li>• Mouth sores</li>
                <li>• Digestive issues</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Supportive Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Ipecacuanha:</strong> For persistent nausea</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety and restlessness</li>
                <li>• <strong>Phosphorus:</strong> For digestive weakness</li>
                <li>• <strong>Cadmium Sulph:</strong> For severe nausea and vomiting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default ChemotherapySideEffects;
