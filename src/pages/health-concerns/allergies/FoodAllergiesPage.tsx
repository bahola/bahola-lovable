
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';

const foodAllergiesData = {
  id: 'food-allergies',
  name: 'Food Allergies',
  description: 'Natural homeopathic approach to managing food allergies and sensitivities',
  category: 'Digestive Allergies',
  image: '/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png',
  icon: '🍎',
  trending: true,
  searchVolume: 8500,
  lastUpdated: '2024-01-15',
  commonRemedies: ['Arsenicum Album', 'Nux Vomica', 'Carbo Vegetabilis', 'Lycopodium']
};

const FoodAllergiesPage = () => {
  return (
    <HealthConcernPageLayout concern={foodAllergiesData}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Food Allergies
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Food allergies occur when the immune system mistakenly identifies certain foods as harmful, 
              triggering allergic reactions that can range from mild to severe.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Food Allergy Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Digestive issues (nausea, vomiting, diarrhea)</li>
              <li>Skin reactions (hives, eczema, swelling)</li>
              <li>Respiratory symptoms (wheezing, difficulty breathing)</li>
              <li>Oral allergy syndrome (mouth tingling)</li>
              <li>Anaphylaxis (severe, life-threatening reaction)</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Homeopathic Support for Food Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic treatment focuses on strengthening the digestive system and reducing hypersensitivity to foods.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Arsenicum Album:</strong> For food poisoning symptoms</li>
                <li><strong>Nux Vomica:</strong> For digestive upset from rich foods</li>
                <li><strong>Carbo Vegetabilis:</strong> For bloating and gas</li>
                <li><strong>Lycopodium:</strong> For chronic digestive issues</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Management Tips:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Keep a detailed food diary</li>
                <li>Read labels carefully</li>
                <li>Carry emergency medication if prescribed</li>
                <li>Inform others about your allergies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default FoodAllergiesPage;
