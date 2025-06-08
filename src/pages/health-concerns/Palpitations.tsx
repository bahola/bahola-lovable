
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const Palpitations = () => {
  const concern = healthConcernsData.find(c => c.id === 'palpitations') || {
    id: 'palpitations',
    name: 'Palpitations',
    description: 'Natural homeopathic support for heart palpitations and irregular heartbeat',
    category: 'Heart Health',
    icon: '💓',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 7200,
    commonRemedies: ['Digitalis', 'Cactus Grandiflorus', 'Lachesis', 'Arsenicum Album'],
    keywords: ['palpitations', 'irregular heartbeat', 'heart rhythm'],
    lastUpdated: '2024-01-15',
    trending: false
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Heart Palpitations
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Heart palpitations are feelings of having a fast-beating, fluttering or pounding heart. 
            Homeopathic remedies provide gentle support for cardiac rhythm irregularities.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Triggers:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Stress and anxiety</li>
                <li>• Caffeine or stimulants</li>
                <li>• Hormonal changes</li>
                <li>• Physical exertion</li>
                <li>• Certain medications</li>
                <li>• Thyroid disorders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Digitalis:</strong> For slow, irregular pulse</li>
                <li>• <strong>Cactus Grand:</strong> For constricting heart pain</li>
                <li>• <strong>Lachesis:</strong> For palpitations during menopause</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety-related palpitations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default Palpitations;
