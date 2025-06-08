
import React from 'react';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { healthConcernsData } from '@/data/healthConcernsData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogProductLink } from '@/components/cross-site/BlogProductLink';

const SeasonalAllergies = () => {
  const concern = healthConcernsData.find(c => c.id === 'seasonal-allergies-hay-fever')!;

  const remedies = [
    {
      name: "Allium Cepa",
      description: "For watery discharge from nose and eyes, burning sensation",
      indications: "Runny nose with clear, watery discharge; Burning, watery eyes; Sneezing fits",
      productId: "allium-cepa-30"
    },
    {
      name: "Sabadilla",
      description: "For spasmodic sneezing and hay fever symptoms",
      indications: "Violent sneezing; Runny nose; Itchy nose and throat; Red, watery eyes",
      productId: "sabadilla-30"
    },
    {
      name: "Euphrasia",
      description: "Primarily for eye symptoms in allergic conditions",
      indications: "Profuse watery discharge from eyes; Burning tears; Photophobia; Swollen eyelids",
      productId: "euphrasia-30"
    },
    {
      name: "Natrum Muriaticum",
      description: "For chronic cases with clear, watery discharge",
      indications: "Chronic hay fever; Clear, egg-white like nasal discharge; Loss of smell and taste",
      productId: "natrum-muriaticum-30"
    },
    {
      name: "Arsenicum Album",
      description: "For burning discharge and restlessness",
      indications: "Thin, watery, burning nasal discharge; Sneezing without relief; Restlessness",
      productId: "arsenicum-album-30"
    },
    {
      name: "Dulcamara",
      description: "For allergies triggered by damp weather",
      indications: "Symptoms worse in damp weather; Stuffed nose; Profuse watery discharge",
      productId: "dulcamara-30"
    }
  ];

  return (
    <HealthConcernPageLayout concern={concern}>
      <div className="space-y-8">
        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-4 font-helvetica">
            Natural Seasonal Allergy Relief
          </h2>
          <p className="text-bahola-neutral-700 mb-4">
            Seasonal allergies, also known as hay fever, can cause significant discomfort during 
            certain times of the year. Homeopathic remedies offer gentle, natural relief without drowsiness.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Common Symptoms:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Sneezing and runny nose</li>
                <li>• Itchy, watery eyes</li>
                <li>• Nasal congestion</li>
                <li>• Postnasal drip</li>
                <li>• Throat irritation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bahola-navy-950 mb-2">Natural Treatment Approach:</h3>
              <ul className="space-y-1 text-bahola-neutral-700">
                <li>• Individualized remedy selection</li>
                <li>• Safe for long-term use</li>
                <li>• No drowsiness or side effects</li>
                <li>• Strengthens natural immunity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Remedies Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-6 font-helvetica">
            Recommended Homeopathic Remedies
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remedies.map((remedy, index) => (
              <Card key={index} className="border border-bahola-neutral-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-bahola-navy-950 mb-3">
                    {remedy.name}
                  </h3>
                  
                  <p className="text-bahola-neutral-700 mb-4 text-sm leading-relaxed">
                    {remedy.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-bahola-navy-950 mb-2">Key Indications:</h4>
                    <p className="text-bahola-neutral-600 text-sm leading-relaxed">
                      {remedy.indications}
                    </p>
                  </div>
                  
                  <BlogProductLink 
                    productId={remedy.productId}
                    productName={remedy.name}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-bahola-blue-50 rounded-lg border border-bahola-blue-200 p-6">
          <h3 className="text-lg font-semibold text-bahola-navy-950 mb-3">
            Important Notes
          </h3>
          <div className="space-y-2 text-bahola-neutral-700 text-sm">
            <p>• Choose the remedy that best matches your specific symptoms</p>
            <p>• Start with 30C potency, take 3-4 times daily during acute symptoms</p>
            <p>• Reduce frequency as symptoms improve</p>
            <p>• Consult a homeopathic practitioner for chronic or severe cases</p>
            <p>• Avoid strong odors, coffee, and mint while taking remedies</p>
          </div>
        </div>
      </div>
    </HealthConcernPageLayout>
  );
};

export default SeasonalAllergies;
