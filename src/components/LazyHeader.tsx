
import React, { Suspense } from 'react';

// Lazy load the full header for better initial performance
const Header = React.lazy(() => import('./Header').then(module => ({ default: module.Header })));

const HeaderSkeleton = () => (
  <div className="w-full">
    {/* Top bar skeleton */}
    <div className="bg-bahola-blue-50 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="hidden md:block h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
    
    {/* Main header skeleton */}
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
    
    {/* Menu skeleton */}
    <div className="bg-white border-b border-gray-200 py-2">
      <div className="container mx-auto px-4 flex space-x-8">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-18 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export const LazyHeader = () => {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />
    </Suspense>
  );
};
