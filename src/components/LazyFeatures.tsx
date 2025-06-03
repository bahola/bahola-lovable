
import React, { Suspense } from 'react';

// Lazy load heavy feature components
const FeaturedProductsSection = React.lazy(() => 
  import('./features/FeaturedProductsSection').then(module => ({ 
    default: module.FeaturedProductsSection 
  }))
);

const TestimonialsSection = React.lazy(() => 
  import('./features/TestimonialsSection').then(module => ({ 
    default: module.TestimonialsSection 
  }))
);

const AboutSection = React.lazy(() => 
  import('./features/AboutSection').then(module => ({ 
    default: module.AboutSection 
  }))
);

// Lightweight skeleton for sections
const SectionSkeleton = ({ height = "h-64" }: { height?: string }) => (
  <div className={`w-full ${height} bg-gray-50 animate-pulse flex items-center justify-center`}>
    <div className="text-center space-y-4">
      <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
      <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
      <div className="h-4 w-80 bg-gray-200 rounded mx-auto"></div>
    </div>
  </div>
);

export const LazyFeaturedProductsSection = () => (
  <Suspense fallback={<SectionSkeleton height="h-96" />}>
    <FeaturedProductsSection />
  </Suspense>
);

export const LazyTestimonialsSection = () => (
  <Suspense fallback={<SectionSkeleton height="h-80" />}>
    <TestimonialsSection />
  </Suspense>
);

export const LazyAboutSection = () => (
  <Suspense fallback={<SectionSkeleton height="h-64" />}>
    <AboutSection />
  </Suspense>
);
