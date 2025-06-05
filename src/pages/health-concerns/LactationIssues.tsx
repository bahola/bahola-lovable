
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';

const LactationIssues = () => {
  const concern = healthConcernsData.find(c => c.id === 'lactation-issues')!;

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Support for Breastfeeding Challenges
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Breastfeeding challenges can be stressful for new mothers. Homeopathy provides gentle, 
            natural support to help establish and maintain successful breastfeeding.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Issues:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Low milk supply</li>
                <li>• Painful breastfeeding</li>
                <li>• Engorgement</li>
                <li>• Blocked milk ducts</li>
                <li>• Mastitis</li>
                <li>• Nipple soreness and cracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Key Remedies:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• <strong>Urtica Urens:</strong> For increasing milk supply</li>
                <li>• <strong>Lac Caninum:</strong> For sore, cracked nipples</li>
                <li>• <strong>Ricinus:</strong> For inadequate milk flow</li>
                <li>• <strong>Agnus Castus:</strong> For hormonal support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default LactationIssues;
