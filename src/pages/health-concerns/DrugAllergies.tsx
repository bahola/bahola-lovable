
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const DrugAllergies = () => {
  const concern = healthConcernsData.find(c => c.id === 'drug-allergies') || {
    id: 'drug-allergies',
    name: 'Drug Allergies',
    description: 'Homeopathic support for managing drug allergies and adverse reactions',
    category: 'Allergies',
    icon: '💊',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 3800,
    commonRemedies: ['Apis Mellifica', 'Urtica Urens', 'Arsenicum Album', 'Rhus Toxicodendron'],
    keywords: ['drug allergies', 'medication reactions', 'pharmaceutical allergy'],
    lastUpdated: '2024-01-15',
    trending: false
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Managing Drug Allergies Naturally
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Drug allergies can range from mild skin reactions to severe systemic responses. 
            Homeopathy provides supportive care to help the body process and eliminate drug reactions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Skin rashes and hives</li>
                <li>• Swelling of face or throat</li>
                <li>• Difficulty breathing</li>
                <li>• Nausea and vomiting</li>
                <li>• Fever and chills</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Supportive Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Apis Mellifica:</strong> For swelling and hives</li>
                <li>• <strong>Urtica Urens:</strong> For burning, stinging rashes</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety and restlessness</li>
                <li>• <strong>Rhus Tox:</strong> For itchy, burning skin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default DrugAllergies;
