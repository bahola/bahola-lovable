
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const SkinConditions = () => {
  // Use the correct id that exists in the data - 'eczema-dermatitis' or create a custom concern object
  const concern = healthConcernsData.find(c => c.id === 'eczema-dermatitis') || {
    id: 'skin-conditions',
    name: 'Skin Conditions',
    description: 'Comprehensive natural treatments for various skin conditions including eczema, dermatitis, and other skin disorders.',
    category: 'skin-care',
    icon: '🧴',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    searchVolume: 35000,
    commonRemedies: ['Sulphur', 'Graphites', 'Arsenicum Album', 'Hepar Sulph'],
    keywords: ['skin conditions', 'eczema', 'dermatitis', 'skin rash', 'itching', 'skin care'],
    lastUpdated: '2024-01-11',
    trending: true,
  };

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Skin Care Solutions
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy treats skin conditions from within, addressing underlying causes rather than 
            just suppressing surface symptoms for lasting relief.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Conditions:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Eczema and dermatitis</li>
                <li>• Acne and pimples</li>
                <li>• Psoriasis</li>
                <li>• Skin rashes and hives</li>
                <li>• Dry, itchy skin</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sulphur:</strong> For chronic skin issues</li>
                <li>• <strong>Graphites:</strong> For eczema</li>
                <li>• <strong>Arsenicum:</strong> For dry, scaly skin</li>
                <li>• <strong>Calendula:</strong> For healing wounds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SkinConditions;
