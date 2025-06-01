
import React from 'react';
import { HomeopathyHeroSection } from '@/components/homeopathy/HeroSection';
import { HomeopathyIntroductionSection } from '@/components/homeopathy/IntroductionSection';
import { TransformationImage } from '@/components/homeopathy/TransformationImage';
import { HomeopathyBenefitsSection } from '@/components/homeopathy/BenefitsSection';
import { HealthConcernsSlider } from '@/components/homeopathy/HealthConcernsSlider';
import { CallToActionSection } from '@/components/homeopathy/CallToActionSection';

const Homeopathy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HomeopathyHeroSection />
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <HomeopathyIntroductionSection />
            <TransformationImage />
            <HomeopathyBenefitsSection />
          </div>
        </div>
      </section>
      
      {/* Interactive Slider Section */}
      <HealthConcernsSlider />
      
      {/* Call-to-Action Section */}
      <CallToActionSection />
    </div>
  );
};

export default Homeopathy;
