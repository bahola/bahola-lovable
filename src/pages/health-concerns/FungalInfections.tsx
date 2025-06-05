
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const FungalInfections = () => {
  const concern = healthConcernsData.find(c => c.id === 'fungal-infections')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Antifungal Support
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy offers gentle yet effective treatment for fungal infections by addressing 
            the underlying susceptibility and restoring natural balance.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Fungal Conditions:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Ringworm infections</li>
                <li>• Candidiasis (yeast infections)</li>
                <li>• Athlete's foot</li>
                <li>• Nail fungus</li>
                <li>• Oral thrush</li>
                <li>• Vaginal yeast infections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For vaginal yeast infections</li>
                <li>• <strong>Borax:</strong> For oral thrush</li>
                <li>• <strong>Graphites:</strong> For skin fungal infections</li>
                <li>• <strong>Sulphur:</strong> For chronic fungal conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default FungalInfections;
