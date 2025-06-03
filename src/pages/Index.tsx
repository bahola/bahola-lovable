
import React, { Suspense } from 'react';
import { SEO } from '@/components/SEO';
import { ShopHeroCarousel } from '@/components/shop/ShopHeroCarousel';
import { SearchActionBar } from '@/components/SearchActionBar';
import { ConsultSection, DiscoverSection } from '@/components/features';

// Lazy load heavy components with higher priority
const LazyFeaturedProductsSection = React.lazy(() => 
  import('@/components/LazyFeatures').then(module => ({
    default: module.LazyFeaturedProductsSection
  }))
);

const LazyTestimonialsSection = React.lazy(() => 
  import('@/components/LazyFeatures').then(module => ({
    default: module.LazyTestimonialsSection
  }))
);

const LazyAboutSection = React.lazy(() => 
  import('@/components/LazyFeatures').then(module => ({
    default: module.LazyAboutSection
  }))
);

// Lightweight skeleton for deferred sections
const DeferredSkeleton = () => (
  <div className="w-full h-64 bg-gray-50 animate-pulse flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
      <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
    </div>
  </div>
);

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
      
      {/* Critical above-the-fold content loads immediately */}
      <ShopHeroCarousel />
      <SearchActionBar />
      <ConsultSection />
      <DiscoverSection />
      
      {/* Heavy components load lazily with improved skeletons */}
      <Suspense fallback={<DeferredSkeleton />}>
        <LazyFeaturedProductsSection />
      </Suspense>
      
      <Suspense fallback={<DeferredSkeleton />}>
        <LazyAboutSection />
      </Suspense>
      
      <Suspense fallback={<DeferredSkeleton />}>
        <LazyTestimonialsSection />
      </Suspense>
    </>
  );
};

export default Index;
