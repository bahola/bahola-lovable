import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';

const generalizedAnxietyData = {
  id: 'generalized-anxiety',
  name: 'Generalized Anxiety Disorder',
  description: 'Natural homeopathic treatment for persistent worry and generalized anxiety',
  category: 'Anxiety Disorders',
  image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
  icon: '🌊',
  trending: false,
  searchVolume: 11000,
  lastUpdated: '2024-01-15',
  commonRemedies: ['Arsenicum Album', 'Kali Phosphoricum', 'Phosphorus', 'Calcarea Carbonica'],
  keywords: ['generalized anxiety', 'chronic worry', 'persistent anxiety', 'excessive worry', 'anxiety disorder']
};

const GeneralizedAnxietyPage = () => {
  return (
    <HealthConcernPageLayout concern={generalizedAnxietyData}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Generalized Anxiety Disorder
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Generalized Anxiety Disorder (GAD) involves persistent, excessive worry about various aspects 
              of daily life that interferes with normal functioning.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">GAD Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Excessive worry about everyday situations</li>
              <li>Difficulty controlling worry</li>
              <li>Restlessness or feeling on edge</li>
              <li>Fatigue and concentration problems</li>
              <li>Muscle tension and sleep disturbances</li>
              <li>Irritability</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Holistic Anxiety Management
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic treatment aims to restore emotional balance and reduce chronic worry patterns naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Arsenicum Album:</strong> For restless anxiety with fear</li>
                <li><strong>Kali Phosphoricum:</strong> For mental exhaustion</li>
                <li><strong>Phosphorus:</strong> For sensitive, anxious nature</li>
                <li><strong>Calcarea Carbonica:</strong> For overwhelming worry</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Lifestyle Support:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Regular exercise routine</li>
                <li>Mindfulness and meditation</li>
                <li>Stress management techniques</li>
                <li>Healthy diet and sleep habits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default GeneralizedAnxietyPage;
