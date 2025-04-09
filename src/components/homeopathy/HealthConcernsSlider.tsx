
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

// Health concerns for the slider
const healthConcerns = [
  {
    name: 'Stress & Anxiety',
    description: 'Homeopathic remedies like Aconite, Arsenicum album, and Phosphorus can help restore emotional balance and calm.'
  },
  {
    name: 'Insomnia',
    description: 'Remedies such as Coffea cruda, Passiflora, and Nux vomica may support natural sleep patterns without morning grogginess.'
  },
  {
    name: 'Allergies',
    description: 'Allium cepa, Sabadilla, and Natrum muriaticum are commonly used to address seasonal and environmental allergies.'
  },
  {
    name: 'Digestive Issues',
    description: 'Nux vomica, Lycopodium, and Carbo vegetabilis can help address various digestive complaints naturally.'
  },
  {
    name: 'Joint Pain',
    description: 'Remedies including Rhus toxicodendron, Bryonia, and Ruta graveolens may provide relief for joint stiffness and discomfort.'
  }
];

export const HealthConcernsSlider = () => {
  const [selectedConcernIndex, setSelectedConcernIndex] = useState(0);
  
  return (
    <section className="py-16 bg-bahola-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Homeopathic Solutions</h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center mb-8">Select a common health concern to learn how homeopathy can help:</p>
          
          <div className="mb-12">
            <Slider
              defaultValue={[0]}
              max={healthConcerns.length - 1}
              step={1}
              value={[selectedConcernIndex]}
              onValueChange={(value) => setSelectedConcernIndex(value[0])}
              className="mb-4"
            />
            
            <div className="flex justify-between text-sm text-bahola-neutral-600">
              {healthConcerns.map((concern, index) => (
                <div key={index} className="text-center px-2">
                  <button 
                    onClick={() => setSelectedConcernIndex(index)}
                    className={`text-xs sm:text-sm whitespace-nowrap ${selectedConcernIndex === index ? 'font-bold text-bahola-blue-600' : ''}`}
                  >
                    {concern.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="shadow-md">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-bahola-blue-600">
                {healthConcerns[selectedConcernIndex].name}
              </h3>
              <p className="text-lg">
                {healthConcerns[selectedConcernIndex].description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
