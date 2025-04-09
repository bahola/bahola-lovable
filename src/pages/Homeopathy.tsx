
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

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

const Homeopathy = () => {
  const [selectedConcernIndex, setSelectedConcernIndex] = useState(0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bahola-blue-400/10 to-bahola-blue-500/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-bahola-neutral-900 mb-6">
              Imagine Yourself Free From Health Concerns
            </h1>
            <p className="text-xl md:text-2xl text-bahola-neutral-700 mb-8">
              Picture a life where you're energized, balanced, and in harmony—naturally.
            </p>
            <Button className="px-8 py-6 rounded-lg btn-bahola text-lg font-medium">
              Begin Your Healing Journey Today
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto mb-16">
              <p className="text-lg mb-6">
                Imagine waking up every morning with energy and a sense of well-being. Imagine moving through your day without the burden of chronic pain, recurring ailments, or emotional stress. Envision yourself vibrant, empowered, and full of life.
              </p>
              <p className="text-lg mb-6">
                Because you deserve to feel this way, homeopathy offers a path to holistic healing. It's a personalized approach that not only addresses your symptoms but also uncovers and resolves the deeper imbalances holding you back.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4">What if you could finally:</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <span className="mr-2 text-bahola-blue-500">•</span>
                  <span>Sleep deeply and wake refreshed?</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-bahola-blue-500">•</span>
                  <span>Breathe easily without allergies weighing you down?</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-bahola-blue-500">•</span>
                  <span>Move freely without joint pain or stiffness?</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-bahola-blue-500">•</span>
                  <span>See your children thriving naturally and healthily?</span>
                </li>
              </ul>
            </div>
            
            {/* Image showing transformation */}
            <div className="relative rounded-lg overflow-hidden h-80 mb-16 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/70 to-bahola-blue-500/60 z-10 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white text-center px-4">Transform Your Health Journey</h3>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Health transformation" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Homeopathy?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Gentle yet Powerful</h3>
                <p>Remedies that work with your body to restore balance.</p>
              </div>
              
              <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Personalized Care</h3>
                <p>No cookie-cutter treatments, only tailored solutions for you.</p>
              </div>
              
              <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Safe for All</h3>
                <p>From newborns to seniors, homeopathy supports every stage of life.</p>
              </div>
              
              <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Holistic Wellness</h3>
                <p>It addresses your mind, body, and emotions as a whole.</p>
              </div>
              
              <div className="md:col-span-2 bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Empowering</h3>
                <p>Feel in control of your health, naturally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Slider Section */}
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
      
      {/* Call-to-Action Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
            alt="Serene sky" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bahola-blue-600/70 to-bahola-blue-400/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Journey to Freedom Starts Here</h2>
            <p className="text-xl mb-10">Take the first step toward reclaiming your health and vitality today.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="px-8 py-3 bg-white text-bahola-blue-600 hover:bg-gray-100 text-lg font-semibold rounded-full">
                Find a remedy for...
              </Button>
              <Button className="px-8 py-3 bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white text-lg font-semibold rounded-full border-2 border-white">
                Talk to a Homeopath Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Homeopathy;
