
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const AnxietyStress = () => {
  const concern = healthConcernsData.find(c => c.id === 'anxiety-stress')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Understanding Anxiety & Stress
          </h2>
          <div className="prose prose-bahola max-w-none">
            <p className="text-bahola-neutral-700 mb-4">
              Anxiety and stress are common experiences that can significantly impact your quality of life. 
              While occasional stress is normal, chronic anxiety and stress can lead to physical and emotional 
              health problems.
            </p>
            <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
            <ul className="list-disc list-inside text-bahola-neutral-700 space-y-1">
              <li>Persistent worry or fear</li>
              <li>Racing thoughts</li>
              <li>Physical tension and restlessness</li>
              <li>Sleep disturbances</li>
              <li>Difficulty concentrating</li>
              <li>Irritability</li>
            </ul>
          </div>
        </div>

        {/* Homeopathic Approach */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Homeopathic Approach to Treatment
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy treats anxiety and stress by addressing the root cause and considering the 
            individual's unique constitution. Treatment aims to restore emotional balance and strengthen 
            the nervous system naturally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li><strong>Ignatia:</strong> For acute grief and emotional shock</li>
                <li><strong>Arsenicum Album:</strong> For anxiety with restlessness</li>
                <li><strong>Aconite:</strong> For sudden, intense panic</li>
                <li><strong>Gelsemium:</strong> For anticipatory anxiety</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Supporting Measures:</h3>
              <ul className="space-y-2 text-bahola-neutral-700">
                <li>Regular exercise and relaxation</li>
                <li>Proper sleep hygiene</li>
                <li>Balanced nutrition</li>
                <li>Stress management techniques</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default AnxietyStress;
