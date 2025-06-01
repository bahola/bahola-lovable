
import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { 
  ConsultSection, 
  DiscoverSection, 
  FeaturedProductsSection, 
  AboutSection,
  TestimonialsSection 
} from '@/components/features';

const Index = () => {
  return (
    <>
      <HeroSection />
      <ConsultSection />
      <DiscoverSection />
      <FeaturedProductsSection />
      <AboutSection />
      <TestimonialsSection />
    </>
  );
};

export default Index;
