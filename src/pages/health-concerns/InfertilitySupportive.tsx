
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const InfertilitySupportive = () => {
  const concern = healthConcernsData.find(c => c.id === 'infertility-supportive')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Supportive Care for Fertility Enhancement
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Infertility can be emotionally and physically challenging. Homeopathy offers supportive care 
            to help optimize reproductive health and support the journey to conception.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Contributing Factors:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Hormonal imbalances</li>
                <li>• Stress and emotional factors</li>
                <li>• Irregular menstrual cycles</li>
                <li>• Reproductive organ health</li>
                <li>• Age-related factors</li>
                <li>• Lifestyle factors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For hormonal balance</li>
                <li>• <strong>Pulsatilla:</strong> For irregular cycles</li>
                <li>• <strong>Natrum Muriaticum:</strong> For emotional stress</li>
                <li>• <strong>Calcarea Carbonica:</strong> For constitutional support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default InfertilitySupportive;
