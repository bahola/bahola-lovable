
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const VaricoseVeins = () => {
  const concern = healthConcernsData.find(c => c.id === 'varicose-veins')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Treatment for Varicose Veins
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Varicose veins occur when veins become enlarged and twisted due to poor circulation. 
            Homeopathy offers natural support to improve venous health and reduce symptoms.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Varicose Vein Signs:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Enlarged, twisted veins</li>
                <li>• Leg pain and heaviness</li>
                <li>• Swelling in legs</li>
                <li>• Muscle cramping</li>
                <li>• Itching around veins</li>
                <li>• Skin discoloration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Hamamelis:</strong> For varicose veins</li>
                <li>• <strong>Pulsatilla:</strong> For venous congestion</li>
                <li>• <strong>Carbo Vegetabilis:</strong> For poor circulation</li>
                <li>• <strong>Aesculus Hippocastanum:</strong> For venous disorders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default VaricoseVeins;
