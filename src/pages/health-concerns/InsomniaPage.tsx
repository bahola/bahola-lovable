
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const InsomniaPage = () => {
  const concern = healthConcernsData.find(c => c.id === 'insomnia-sleep-disorders')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Sleep Disorders
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Sleep disorders can significantly impact your physical health, mental well-being, and daily functioning. 
              Quality sleep is essential for the body's healing and regeneration processes.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Sleep Issues:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Difficulty falling asleep</li>
              <li>Frequent night wakings</li>
              <li>Early morning awakening</li>
              <li>Restless, non-refreshing sleep</li>
              <li>Nightmares and night terrors</li>
              <li>Sleep anxiety</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Sleep Solutions
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathic remedies work gently to restore natural sleep patterns without creating dependency. 
            Treatment focuses on addressing underlying causes and individual sleep patterns.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Coffea Cruda:</strong> For overactive mind at bedtime</li>
                <li><strong>Nux Vomica:</strong> For stress-related insomnia</li>
                <li><strong>Passiflora:</strong> For gentle, natural sedation</li>
                <li><strong>Chamomilla:</strong> For restless sleep and irritability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Sleep Hygiene Tips:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Maintain consistent sleep schedule</li>
                <li>Create calming bedtime routine</li>
                <li>Avoid screens before bedtime</li>
                <li>Keep bedroom cool and dark</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default InsomniaPage;
