
import React from 'react';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/HeroSection';
import { 
  ConsultSection, 
  DiscoverSection, 
  FeaturedProductsSection, 
  AboutSection,
  TestimonialsSection 
} from '@/components/features';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bahola Labs",
    "description": "Leading provider of premium homeopathic medicines and natural health solutions with expert consultations and personalized treatment plans.",
    "url": "https://bahola-labs.lovable.app",
    "logo": "https://bahola-labs.lovable.app/bahola-logo.png",
    "foundingDate": "1982",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/bahola-labs",
      "https://www.instagram.com/bahola-labs",
      "https://www.twitter.com/bahola-labs"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Homeopathic Medicines",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Homeopathic Remedies for Anxiety & Stress"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Natural Sleep Disorder Solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Digestive Health Remedies"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Bahola Labs - Premium Homeopathic Remedies & Natural Health Solutions"
        description="Discover premium homeopathic medicines and natural health solutions at Bahola Labs. Expert consultations, authentic remedies, and personalized treatment for optimal wellness since 1982."
        keywords={[
          'homeopathic medicine',
          'natural remedies',
          'holistic health',
          'alternative medicine',
          'homeopathy consultation',
          'natural health solutions',
          'bahola labs',
          'wellness products',
          'anxiety treatment',
          'sleep disorders',
          'digestive health',
          'skin conditions',
          'joint pain relief'
        ]}
        url="/"
        structuredData={structuredData}
      />
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
