
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LatexAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'latex-allergy') || {
    id: 'latex-allergy',
    name: 'Latex Allergy',
    description: 'Homeopathic support for latex allergies and rubber sensitivity reactions',
    category: 'Allergies',
    icon: '🧤',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 2400,
    commonRemedies: ['Apis Mellifica', 'Urtica Urens', 'Rhus Toxicodendron', 'Arsenicum Album'],
    keywords: ['latex allergy', 'rubber sensitivity', 'medical gloves allergy'],
    lastUpdated: '2024-01-15',
    trending: false
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Managing Latex Allergies Naturally
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Latex allergies can cause reactions ranging from skin irritation to severe systemic responses. 
            Homeopathic treatment provides natural support for managing latex sensitivity.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Sources:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Medical and surgical gloves</li>
                <li>• Balloons and rubber toys</li>
                <li>• Condoms and diaphragms</li>
                <li>• Elastic bands and clothing</li>
                <li>• Medical devices and tubing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Supportive Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Apis Mellifica:</strong> For swelling and hives</li>
                <li>• <strong>Urtica Urens:</strong> For burning, stinging rashes</li>
                <li>• <strong>Rhus Tox:</strong> For itchy, vesicular eruptions</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety with reactions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LatexAllergy;
