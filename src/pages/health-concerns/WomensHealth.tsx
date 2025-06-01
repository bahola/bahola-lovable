
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const WomensHealth = () => {
  const concern = healthConcernsData.find(c => c.id === 'womens-health')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Women's Health Solutions
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Homeopathy provides gentle, natural support for women's health issues throughout all stages of life, 
            from puberty through menopause.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Health Concerns:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Menstrual irregularities</li>
                <li>• PMS and mood changes</li>
                <li>• Menopause symptoms</li>
                <li>• Hormonal imbalances</li>
                <li>• PCOS and fertility issues</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Sepia:</strong> For hormonal imbalances</li>
                <li>• <strong>Pulsatilla:</strong> For irregular periods</li>
                <li>• <strong>Lachesis:</strong> For menopause</li>
                <li>• <strong>Nat Mur:</strong> For emotional symptoms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default WomensHealth;
