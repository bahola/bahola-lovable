
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { 
  ConsultSection, 
  DiscoverSection, 
  FeaturedProductsSection, 
  AboutSection,
  TestimonialsSection 
} from '@/components/FeaturesSections';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="w-full">
        <HeroSection />
        <ConsultSection />
        <DiscoverSection />
        <FeaturedProductsSection />
        <AboutSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
