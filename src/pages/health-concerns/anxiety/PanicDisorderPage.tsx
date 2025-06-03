import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';

const panicDisorderData = {
  id: 'panic-disorder',
  name: 'Panic Disorder',
  description: 'Natural homeopathic treatment for panic attacks and panic disorder',
  category: 'Anxiety Disorders',
  image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
  icon: '💭',
  trending: true,
  searchVolume: 9500,
  lastUpdated: '2024-01-15',
  commonRemedies: ['Aconitum', 'Argentum Nitricum', 'Gelsemium', 'Ignatia'],
  keywords: ['panic disorder', 'panic attacks', 'anxiety attacks', 'sudden anxiety', 'intense fear']
};

const PanicDisorderPage = () => {
  return (
    <HealthConcernPageLayout concern={panicDisorderData}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Panic Disorder
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Panic disorder is characterized by recurrent, unexpected panic attacks followed by persistent 
              worry about having additional attacks or their consequences.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Panic Attack Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Rapid or pounding heartbeat</li>
              <li>Sweating and trembling</li>
              <li>Shortness of breath</li>
              <li>Chest pain or discomfort</li>
              <li>Fear of losing control or dying</li>
              <li>Dizziness or feeling faint</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Panic Disorder Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies can help reduce the frequency and intensity of panic attacks while addressing underlying anxiety.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Aconitum:</strong> For sudden, intense panic attacks</li>
                <li><strong>Argentum Nitricum:</strong> For anticipatory anxiety</li>
                <li><strong>Gelsemium:</strong> For trembling and weakness</li>
                <li><strong>Ignatia:</strong> For emotional panic attacks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Coping Strategies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Practice deep breathing exercises</li>
                <li>Learn grounding techniques</li>
                <li>Maintain regular sleep schedule</li>
                <li>Limit caffeine and alcohol</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PanicDisorderPage;
