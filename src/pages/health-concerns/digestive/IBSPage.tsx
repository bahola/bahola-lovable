
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';

const ibsData = {
  id: 'ibs',
  name: 'Irritable Bowel Syndrome (IBS)',
  description: 'Natural homeopathic treatment for IBS and digestive discomfort',
  category: 'Digestive Disorders',
  image: '/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png',
  icon: '🫄',
  trending: true,
  searchVolume: 13500,
  lastUpdated: '2024-01-15',
  commonRemedies: ['Nux Vomica', 'Colocynthis', 'Lycopodium', 'Aloe Socotrina']
};

const IBSPage = () => {
  return (
    <HealthConcernPageLayout concern={ibsData}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding IBS
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Irritable Bowel Syndrome is a common digestive disorder affecting the large intestine, 
              characterized by cramping, bloating, gas, and changes in bowel habits.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">IBS Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Abdominal pain and cramping</li>
              <li>Bloating and gas</li>
              <li>Diarrhea or constipation (or both)</li>
              <li>Mucus in stool</li>
              <li>Feeling of incomplete bowel movement</li>
              <li>Symptoms triggered by stress or certain foods</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural IBS Management
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies can help regulate digestive function and reduce IBS symptoms by addressing the root cause.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Nux Vomica:</strong> For stress-related IBS</li>
                <li><strong>Colocynthis:</strong> For cramping abdominal pain</li>
                <li><strong>Lycopodium:</strong> For bloating and gas</li>
                <li><strong>Aloe Socotrina:</strong> For urgent diarrhea</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Dietary Management:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Identify trigger foods</li>
                <li>Eat smaller, frequent meals</li>
                <li>Stay hydrated</li>
                <li>Consider probiotics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default IBSPage;
