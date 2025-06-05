
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const AnginaPectoris = () => {
  const concern = healthConcernsData.find(c => c.id === 'angina-pectoris')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Supportive Care for Angina and Chest Pain
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Angina pectoris is chest pain caused by reduced blood flow to the heart. Homeopathy 
            provides supportive care to help manage symptoms and improve cardiac function.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Angina Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Chest pain or pressure</li>
                <li>• Pain radiating to arm/jaw</li>
                <li>• Shortness of breath</li>
                <li>• Pain with exertion</li>
                <li>• Fatigue</li>
                <li>• Sweating</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Cactus Grandiflorus:</strong> For chest constriction</li>
                <li>• <strong>Spigelia:</strong> For sharp chest pain</li>
                <li>• <strong>Arsenicum Album:</strong> For anxiety with pain</li>
                <li>• <strong>Lachesis:</strong> For heart palpitations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default AnginaPectoris;
