import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';

const asthmaData = {
  id: 'asthma',
  name: 'Asthma',
  description: 'Natural homeopathic treatment for asthma and respiratory allergies',
  category: 'Respiratory Allergies',
  image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
  icon: '🫁',
  trending: true,
  searchVolume: 15000,
  lastUpdated: '2024-01-15',
  commonRemedies: ['Arsenicum Album', 'Antimonium Tartaricum', 'Blatta Orientalis', 'Lobelia'],
  keywords: ['asthma', 'wheezing', 'breathing problems', 'respiratory allergies', 'chest tightness']
};

const AsthmaPage = () => {
  return (
    <HealthConcernPageLayout concern={asthmaData}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Asthma
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Asthma is a chronic respiratory condition characterized by inflammation and narrowing of the airways, 
              leading to difficulty breathing, wheezing, and coughing.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Asthma Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Shortness of breath</li>
              <li>Wheezing or whistling sound when breathing</li>
              <li>Persistent cough, especially at night</li>
              <li>Chest tightness or pain</li>
              <li>Difficulty sleeping due to breathing problems</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Homeopathic Treatment for Asthma
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies aim to strengthen the respiratory system and reduce the frequency and severity of asthma attacks naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Arsenicum Album:</strong> For anxiety with breathing difficulties</li>
                <li><strong>Antimonium Tartaricum:</strong> For rattling chest congestion</li>
                <li><strong>Blatta Orientalis:</strong> For chronic asthma cases</li>
                <li><strong>Lobelia:</strong> For spasmodic asthma attacks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Prevention Tips:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Identify and avoid triggers</li>
                <li>Maintain good air quality at home</li>
                <li>Practice breathing exercises</li>
                <li>Stay physically active as tolerated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default AsthmaPage;
