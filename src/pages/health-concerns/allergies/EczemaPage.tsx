
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';

const eczemaData = {
  id: 'eczema',
  name: 'Eczema',
  description: 'Natural homeopathic treatment for eczema and atopic dermatitis',
  category: 'Skin Allergies',
  image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
  icon: '🧴',
  trending: false,
  searchVolume: 12000,
  lastUpdated: '2024-01-15',
  commonRemedies: ['Graphites', 'Sulphur', 'Petroleum', 'Hepar Sulph']
};

const EczemaPage = () => {
  return (
    <HealthConcernPageLayout concern={eczemaData}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Eczema
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Eczema is a chronic skin condition that causes dry, itchy, and inflamed skin patches. 
              It's often linked to allergies and can significantly impact quality of life.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Eczema Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Red, inflamed skin patches</li>
              <li>Intense itching</li>
              <li>Dry, scaly skin</li>
              <li>Blisters or weeping lesions</li>
              <li>Thickened skin from scratching</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Eczema Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies work to heal eczema from within by addressing the underlying immune system imbalance.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Graphites:</strong> For dry, cracked eczema</li>
                <li><strong>Sulphur:</strong> For itchy, burning eczema</li>
                <li><strong>Petroleum:</strong> For winter eczema</li>
                <li><strong>Hepar Sulph:</strong> For infected eczema</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Skin Care Tips:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Use gentle, fragrance-free products</li>
                <li>Keep skin well moisturized</li>
                <li>Avoid known triggers</li>
                <li>Wear soft, breathable fabrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default EczemaPage;
