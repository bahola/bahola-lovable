
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PoorCirculation = () => {
  const concern = healthConcernsData.find(c => c.id === 'poor-circulation')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Improving Blood Circulation Naturally
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Poor circulation affects blood flow to various parts of the body. Homeopathy helps 
            improve circulation and promote healthy blood flow to extremities and organs.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Circulation Issues:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Cold hands and feet</li>
                <li>• Numbness in extremities</li>
                <li>• Leg cramps</li>
                <li>• Slow wound healing</li>
                <li>• Varicose veins</li>
                <li>• Fatigue</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Secale Cornutum:</strong> For peripheral circulation</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For poor circulation</li>
                <li>• <strong>Crataegus:</strong> For heart circulation</li>
                <li>• <strong>Aesculus:</strong> For venous circulation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PoorCirculation;
