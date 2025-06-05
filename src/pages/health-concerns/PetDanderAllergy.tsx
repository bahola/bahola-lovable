
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const PetDanderAllergy = () => {
  const concern = healthConcernsData.find(c => c.id === 'pet-dander-allergy')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Relief from Pet Dander Allergies
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Pet allergies can make it challenging to enjoy the company of beloved animals. 
            Homeopathy offers gentle solutions to reduce sensitivity while maintaining your bond with pets.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Triggers:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Cat dander and saliva</li>
                <li>• Dog hair and dander</li>
                <li>• Pet urine proteins</li>
                <li>• Bird feathers and droppings</li>
                <li>• Small animal bedding</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Arsenicum Album:</strong> For respiratory symptoms</li>
                <li>• <strong>Histaminum:</strong> For allergic reactions</li>
                <li>• <strong>Natrum Muriaticum:</strong> For watery discharge</li>
                <li>• <strong>Dulcamara:</strong> For damp weather aggravation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default PetDanderAllergy;
